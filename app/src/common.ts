import {
  Cart,
  createOrder,
  createPayment,
  getCartById,
  getClientCredentialsToken,
  getOrderById,
  updateCart,
  updatePayment,
  updateOrder,
  getPaymentById,
  createTransaction,
} from '@worldline/ctintegration-ct';
import {
  getPayment,
  saveCustomerPaymentToken,
  setPayment,
  capturePaymentInDB,
} from '@worldline/ctintegration-db';
import { logger, retry } from '@worldline/ctintegration-util';
import { PaymentPayload, RefundPayload } from './types';
import {
  getPaymentDBPayload,
  getPaymentFilterQuery,
  getCreateOrderCTPayload,
  getUpdateCartPayload,
  getMappedStatus,
  getCaptureDatabasePayload,
  hasEqualAmounts,
  hasValidAmount,
  hasEqualAmountOrder,
  isPaymentProcessing,
  shouldSaveToken,
  getCustomerTokenPayload,
} from './mappers';
import Constants from './constants';

const createOrderWithPayment = async (payload: PaymentPayload, cart: Cart) => {
  // Create order and payment
  const ctPayment = await createPayment(payload);

  // Mutate cart for add payment
  const { updatedCart } = await updateCart(
    getUpdateCartPayload(cart, ctPayment),
  );

  // Get access token
  const token = await getClientCredentialsToken();

  const ctOrder = await createOrder(
    getCreateOrderCTPayload(updatedCart, token),
  );

  return { order: ctOrder };
};

const updateOrderWithPayment = async (
  payload: PaymentPayload,
  dbPayment: { orderId: string },
) => {
  const order = await getOrderById(dbPayment.orderId);
  if (!order) {
    throw {
      message: `Failed to fetch the order with id '${dbPayment.orderId}'`,
      statusCode: 500,
    };
  }

  // Mutate cart for update payment
  const { updatedPayment } = await updatePayment(payload, order);

  return {
    order: { id: order.id, version: order.version },
    payment: updatedPayment,
  };
};

export async function orderPaymentHandler(payload: PaymentPayload) {
  // log the payload
  logger().debug(`[orderPaymentHandler] payload: ${JSON.stringify(payload)}`);

  const { PAYMENT } = Constants;

  return retry(async () => {
    // Fetch DB payment
    const dbPayment = await getPayment(getPaymentDBPayload(payload));

    if (!dbPayment) {
      logger().error('[orderPaymentHandler] Failed to fetch the payment');
      return { isRetry: true };
    }

    try {
      // Fetch CT cart
      const cart = await getCartById(dbPayment.cartId);
      if (!cart) {
        await setPayment({ id: dbPayment.id }, { status: 'IN_REVIEW' });
        // TODO: store the error message in database.

        logger().error(`Cart '${dbPayment.cartId}' is missing!`);
        return { isRetry: true };
      }

      if (hasEqualAmounts(payload, cart)) {
        // TODO: send a notification to admin and add a column to save the reason
        logger().error(
          '[orderPaymentHandler] Cart amount doesnt match with the paid amount',
        );
        return { isRetry: true };
      }

      if (isPaymentProcessing(dbPayment.state)) {
        logger().error(
          `[orderPaymentHandler] Failed to process the payment as it is already in '${dbPayment.state}' state!`,
        );
        return { isRetry: true };
      }

      const mappedStatus = getMappedStatus(payload);

      if (mappedStatus === PAYMENT.DATABASE.STATUS.FAILED) {
        await setPayment({ id: dbPayment.id }, { status: mappedStatus });
        return {
          isRetry: false,
          data: {
            message: `Updated payment status as ${mappedStatus} as we received status as ${payload.payment.status}`,
          },
        };
      }

      await setPayment(
        { id: dbPayment.id },
        { state: PAYMENT.DATABASE.STATE.PROCESSING },
      );

      // TODO: What happens when one of the webhook arrive out of sync?
      // E.g. a payment got authorized and then captured, but the webhooks reached in reverse order
      const result = !dbPayment?.orderId
        ? await createOrderWithPayment(payload, cart)
        : await updateOrderWithPayment(payload, dbPayment);

      // update order id and reset the state as DEFAULT
      await setPayment(getPaymentFilterQuery(dbPayment), {
        ...(!dbPayment.orderId && result?.order?.id
          ? { orderId: result.order.id, worldlineId: payload?.payment?.id }
          : { worldlineId: payload?.payment?.id }),
        state: PAYMENT.DATABASE.STATE.DEFAULT,
        status: mappedStatus,
      });

      //  Should save the token only:
      //  if "storePermanently" field is received as true
      //  and cart has a logged in customer
      if (shouldSaveToken(cart, dbPayment)) {
        await saveCustomerPaymentToken(
          getCustomerTokenPayload(cart, dbPayment, payload),
        );
      }

      return { isRetry: false, data: result };
    } catch (error) {
      // If any exception happens, reset to default state
      await setPayment(getPaymentFilterQuery(dbPayment), {
        state: PAYMENT.DATABASE.STATE.DEFAULT,
      });
      throw error;
    }
  });
}
const updateOrderStatus = async (
  orderId: string,
  orderStatus: string,
  paymentStatus?: string,
) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw {
      message: `Failed to fetch the order with id '${orderId}'`,
      statusCode: 500,
    };
  }

  const { updatedOrder } = await updateOrder(order, orderStatus, paymentStatus);

  return { order: updatedOrder };
};

const createTransactionInPayment = async (
  paymentId: string,
  payload: RefundPayload | PaymentPayload,
  type: string,
) => {
  const payment = await getPaymentById(paymentId);

  if (!payment) {
    throw {
      message: `Failed to fetch the payment with id '${paymentId}'`,
      statusCode: 500,
    };
  }

  const { amount, currencyCode } =
    'refund' in payload
      ? payload.refund.refundOutput.amountOfMoney
      : payload.payment.paymentOutput.amountOfMoney;

  const { updatedPayment } = await createTransaction(
    payment,
    amount,
    currencyCode,
    type,
  );

  return { payment: updatedPayment };
};

export async function orderPaymentCaptureHandler(payload: PaymentPayload) {
  // log the payload
  logger().debug(
    `[orderPaymentCaptureHandler]: payload: ${JSON.stringify(payload)}`,
  );
  return retry(async () => {
    // Fetch DB payment
    const payment = await getPayment(getPaymentDBPayload(payload));
    if (!payment) {
      logger().error(
        '[orderPaymentCaptureHandler] Failed to fetch the payment',
      );
      return { isRetry: true };
    }

    // Fetch CT order
    const order = await getOrderById(payment.orderId);
    if (!order) {
      logger().error(
        `[orderPaymentCaptureHandler] Order with id: '${payment.orderId}' is missing in CT!`,
      );
      return { isRetry: false };
    }
    if (!hasEqualAmountOrder(payload, order)) {
      logger().error(
        "[orderPaymentCaptureHandler] Order amount doesn't match with the paid amount",
      );
      return { isRetry: false };
    }
    const mappedStatus = getMappedStatus(payload);
    if (mappedStatus === 'FAILED') {
      await capturePaymentInDB(
        getCaptureDatabasePayload(
          payment,
          payload.payment?.paymentOutput?.amountOfMoney?.amount,
          mappedStatus,
          'Charge',
        ),
      );
      return {
        isRetry: false,
        data: {
          message: `Updated capture payment status as ${mappedStatus} as we received status as ${payload.payment.status}`,
        },
      };
    }
    let result;
    // if order id exists
    if (payment.orderId) {
      result = await updateOrderStatus(payment.orderId, 'Confirmed', 'Paid');
      if (order.paymentInfo?.payments[0]?.id) {
        await createTransactionInPayment(
          order.paymentInfo.payments[0].id,
          payload,
          'Charge',
        );
      }
      await capturePaymentInDB(
        getCaptureDatabasePayload(
          payment,
          payload.payment?.paymentOutput?.amountOfMoney?.amount,
          mappedStatus,
          'Charge',
        ),
      );
      // Update payment table
      await setPayment({ id: payment.id }, { status: mappedStatus });
    }
    return { isRetry: false, data: result };
  });
}

export async function refundPaymentHandler(payload: RefundPayload) {
  // log the payload
  logger().debug(`[refundPaymentHandler]:payload: ${JSON.stringify(payload)}`);
  return retry(async () => {
    // Fetch DB payment
    const payment = await getPayment(getPaymentDBPayload(payload));

    if (!payment) {
      logger().error('[refundPaymentHandler] Failed to fetch the payment');
      return { isRetry: true };
    }
    const refundAmount = payload.refund.refundOutput.amountOfMoney.amount;
    // Fetch CT order
    const order = await getOrderById(payment.orderId);
    if (!order) {
      logger().error(
        `[refundPaymentHandler] Order with id: '${payment.orderId}' is missing!`,
      );
      return { isRetry: false };
    }

    // Validate refund amount
    const hasValidRefund = hasValidAmount(order, refundAmount);

    if (hasValidRefund.isGreater) {
      logger().error(
        '[refundPaymentHandler] Refund amount cannot be greater than the order amount!',
      );
      return { isRetry: false };
    }

    const mappedStatus = getMappedStatus(payload);

    if (mappedStatus === 'FAILED') {
      await capturePaymentInDB(
        getCaptureDatabasePayload(
          payment,
          refundAmount,
          mappedStatus,
          'Refund',
        ),
      );
      return {
        isRetry: false,
        data: {
          message: `Updated refund payment status as ${mappedStatus} as we received status as ${payload.refund.status}`,
        },
      };
    }
    let response;
    if (order.paymentInfo?.payments[0].id) {
      response = createTransactionInPayment(
        order.paymentInfo?.payments[0].id,
        payload,
        'Refund',
      );
      await capturePaymentInDB(
        getCaptureDatabasePayload(
          payment,
          refundAmount,
          mappedStatus,
          'Refund',
        ),
      );
      // Update payment table
      await setPayment({ id: payment.id }, { status: mappedStatus });
    }

    // if refund is equal to order amount
    if (hasValidRefund.isEqual) {
      // update order status
      const result = await updateOrderStatus(payment.orderId, 'Complete');
      if (result.order.orderState === 'Complete') {
        logger().info(`Order status update to : ${result.order.orderState}`);
      }
    }

    return { isRetry: false, data: response };
  });
}

export async function orderPaymentCancelHandler(payload: PaymentPayload) {
  // log the payload
  logger().debug(
    `[orderPaymentCancelHandler]:payload: ${JSON.stringify(payload)}`,
  );
  return retry(async () => {
    // Fetch DB payment
    const payment = await getPayment(getPaymentDBPayload(payload));
    if (!payment) {
      logger().error('[orderPaymentCancelHandler] Failed to fetch the payment');
      return { isRetry: true };
    }
    const cancelAmount = payload.payment?.paymentOutput?.amountOfMoney?.amount;
    // Fetch CT order
    const order = await getOrderById(payment.orderId);
    if (!order) {
      logger().error(
        `[orderPaymentCancelHandler] Order with id: '${payment.orderId}' is missing!`,
      );
      return { isRetry: false };
    }

    // Validate amount
    const amount = hasValidAmount(order, cancelAmount);
    if (amount.isGreater) {
      logger().error('[orderPaymentCancelHandler] Cancel amount is not valid!');
      return { isRetry: false };
    }

    const mappedStatus = getMappedStatus(payload);
    if (mappedStatus === 'FAILED') {
      await capturePaymentInDB(
        getCaptureDatabasePayload(
          payment,
          cancelAmount,
          mappedStatus,
          'CancelAuthorization',
        ),
      );
      return {
        isRetry: false,
        data: {
          message: `Updated cancel payment status as ${mappedStatus} as we received status as ${payload.payment.status}`,
        },
      };
    }
    if (order.paymentInfo?.payments[0].id) {
      const response = await createTransactionInPayment(
        order.paymentInfo?.payments[0].id,
        payload,
        'CancelAuthorization',
      );
      if (response.payment.id) {
        logger().info(
          '[orderPaymentCancelHandler] Successfully created cancelled payment transaction in CT!',
        );
      }
      await capturePaymentInDB(
        getCaptureDatabasePayload(
          payment,
          cancelAmount,
          mappedStatus,
          'CancelAuthorization',
        ),
      );
      // Update payment table
      await setPayment({ id: payment.id }, { status: mappedStatus });
    }
    let result;
    // if cancel amount is equal to order amount
    if (amount.isEqual) {
      // update order status
      result = await updateOrderStatus(payment.orderId, 'Cancelled');
      if (result.order.orderState === 'Cancelled') {
        logger().info(
          `[orderPaymentCancelHandler] Successfully updated order status to : ${result.order.orderState}`,
        );
      }
    }

    return { isRetry: false, data: result };
  });
}
