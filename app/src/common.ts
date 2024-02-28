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
  getCustomObjects,
} from '@worldline/ctintegration-ct';
import {
  getPayment,
  saveCustomerPaymentToken,
  setPayment,
} from '@worldline/ctintegration-db';
import { logger, retry } from '@worldline/ctintegration-util';
import { CustomObjects, PaymentPayload, RefundPayload } from './types';
import {
  getPaymentDBPayload,
  getPaymentFilterQuery,
  getCreateOrderCTPayload,
  getUpdateCartPayload,
  getMappedStatus,
  hasEqualAmounts,
  hasValidAmount,
  isPaymentProcessing,
  shouldSaveToken,
  getCustomerTokenPayload,
  calculateRemainingOrderAmount,
} from './mappers';
import Constants from './constants';
import { calculateTotalCaptureAmount } from './capturePayment';

const createOrderWithPayment = async (
  payload: PaymentPayload,
  cart: Cart,
  customObjects: CustomObjects,
) => {
  // Create order and payment
  const ctPayment = await createPayment(payload);

  // Mutate cart for add payment
  const { updatedCart } = await updateCart(
    getUpdateCartPayload(cart, ctPayment),
  );

  // Get access token
  const token = await getClientCredentialsToken();

  const ctOrder = await createOrder(
    getCreateOrderCTPayload(updatedCart, token, customObjects),
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

  const { PAYMENT, STATUS } = Constants;

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
        await setPayment({ id: dbPayment.id }, { status: 'IN_REVIEW' });
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

      await setPayment(
        { id: dbPayment.id },
        { state: PAYMENT.DATABASE.STATE.PROCESSING },
      );

      const customObjects = await getCustomObjects(dbPayment.storeId);

      // TODO: What happens when one of the webhook arrive out of sync?
      // E.g. a payment got authorized and then captured, but the webhooks reached in reverse order
      let result;
      if (payload.type === STATUS.PENDING_CAPTURE) {
        result = !dbPayment?.orderId
          ? await createOrderWithPayment(payload, cart, customObjects)
          : await updateOrderWithPayment(payload, dbPayment);

        /**
         * save token if;
         * - `storePermanently` field is received as true
         * - cart has a logged in customer
         * - payment is used by card
         */
        if (shouldSaveToken(cart, dbPayment, payload)) {
          await saveCustomerPaymentToken(
            getCustomerTokenPayload(cart, dbPayment, payload),
          );
        }
      }

      // update order id and reset the state as DEFAULT
      const updateQuery = {
        ...(!dbPayment.orderId && result?.order?.id
          ? { orderId: result.order.id }
          : {}),
        worldlineId: payload?.payment?.id,
        worldlineStatus: payload?.payment?.status || '',
        worldlineStatusCode: payload?.payment?.statusOutput?.statusCode || 0,
        currency: payload?.payment?.paymentOutput.amountOfMoney.currencyCode,
        total: payload?.payment?.paymentOutput.amountOfMoney.amount,
        state: PAYMENT.DATABASE.STATE.DEFAULT,
        status: mappedStatus,
        errors: payload?.payment?.statusOutput?.errors
          ? JSON.stringify(payload?.payment?.statusOutput?.errors)
          : '',
      };

      await setPayment(getPaymentFilterQuery(dbPayment), updateQuery);

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
  // Fetch DB payment
  const payment = await getPayment(getPaymentDBPayload(payload));
  if (!payment) {
    logger().error('[orderPaymentCaptureHandler] Failed to fetch the payment');
    throw {
      message: 'Failed to fetch payment from the DB',
      statusCode: 500,
    };
  }

  // Fetch CT order
  const order = await getOrderById(payment.orderId);
  if (!order) {
    logger().error(
      `[orderPaymentCaptureHandler] Order with id: '${payment.orderId}' is missing in CT!`,
    );
    throw {
      message: 'Failed to fetch order from CT',
      statusCode: 500,
    };
  }
  const captureAmount = payload.payment.paymentOutput.amountOfMoney.amount;
  // Validate capture amount
  const totalCaptureAmount = await calculateTotalCaptureAmount(order);

  const diffAmount = calculateRemainingOrderAmount(order, totalCaptureAmount);

  const hasValidCapture = hasValidAmount(order, totalCaptureAmount);

  // Check if the capture amount exceeds the remaining order amount or equals the total capture amount
  if (
    hasValidCapture.isEqual ||
    (captureAmount > diffAmount && diffAmount !== 0)
  ) {
    logger().error('[orderPaymentCaptureHandler] Capture amount is invalid!');
    throw {
      message: 'Capture amount is invalid!',
      statusCode: 500,
    };
  }

  const mappedStatus = getMappedStatus(payload);
  if (mappedStatus === 'FAILED') {
    logger().error(
      '[orderPaymentCaptureHandler] Received mappedStatus as :',
      JSON.stringify(mappedStatus),
    );
    await setPayment({ id: payment.id }, { status: mappedStatus });
    throw {
      message: 'Received mapped status as : FAILED',
      statusCode: 500,
    };
  }
  // if payment exist in order
  if (order.paymentInfo?.payments[0]?.id) {
    await createTransactionInPayment(
      order.paymentInfo.payments[0].id,
      payload,
      'Charge',
    );
  }
  const result = {
    status: 'Partial capture requested',
  };

  if (diffAmount === 0 || diffAmount === captureAmount) {
    const response = await updateOrderStatus(
      payment.orderId,
      'Confirmed',
      'Paid',
    );
    // Update payment table
    await setPayment({ id: payment.id }, { status: mappedStatus });
    return response;
  }
  return result;
}

export async function refundPaymentHandler(payload: RefundPayload) {
  // log the payload
  logger().debug(`[refundPaymentHandler]:payload: ${JSON.stringify(payload)}`);

  // Fetch DB payment
  const payment = await getPayment(getPaymentDBPayload(payload));

  if (!payment) {
    logger().error('[refundPaymentHandler] Failed to fetch the payment');
    throw {
      message: 'Failed to fetch payment from the DB',
      statusCode: 500,
    };
  }
  const refundAmount = payload.refund.refundOutput.amountOfMoney.amount;

  // Fetch CT order
  const order = await getOrderById(payment.orderId);
  if (!order) {
    logger().error(
      `[refundPaymentHandler] Order with id: '${payment.orderId}' is missing!`,
    );
    throw {
      message: 'Failed to fetch order from CT',
      statusCode: 500,
    };
  }

  // Validate refund amount
  const hasValidRefund = hasValidAmount(order, refundAmount);

  if (hasValidRefund.isGreater) {
    logger().error(
      '[refundPaymentHandler] Refund amount cannot be greater than the order amount!',
    );
    throw {
      message: 'Refund amount cannot be greater than the order amount!',
      statusCode: 500,
    };
  }

  const mappedStatus = getMappedStatus(payload);

  if (mappedStatus === 'FAILED') {
    logger().error(
      '[refundPaymentHandler] Received mappedStatus as :',
      JSON.stringify(mappedStatus),
    );
    await setPayment({ id: payment.id }, { status: mappedStatus });
    throw {
      message: 'Received mapped status as : FAILED',
      statusCode: 500,
    };
  }
  let response;
  if (order.paymentInfo?.payments[0].id) {
    response = createTransactionInPayment(
      order.paymentInfo?.payments[0].id,
      payload,
      'Refund',
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
  return response;
}

export async function orderPaymentCancelHandler(payload: PaymentPayload) {
  // log the payload
  logger().debug(
    `[orderPaymentCancelHandler]:payload: ${JSON.stringify(payload)}`,
  );

  // Fetch DB payment
  const payment = await getPayment(getPaymentDBPayload(payload));
  if (!payment) {
    logger().error('[orderPaymentCancelHandler] Failed to fetch the payment');
    throw {
      message: 'Failed to fetch payment from the DB',
      statusCode: 500,
    };
  }

  const cancelAmount = payload.payment?.paymentOutput?.amountOfMoney?.amount;
  // Fetch CT order
  const order = await getOrderById(payment.orderId);
  if (!order) {
    logger().error(
      `[orderPaymentCancelHandler] Order with id: '${payment.orderId}' is missing!`,
    );
    throw {
      message: 'Failed to fetch order from CT',
      statusCode: 500,
    };
  }

  // Validate amount
  const amount = hasValidAmount(order, cancelAmount);
  if (amount.isGreater) {
    logger().error('[orderPaymentCancelHandler] Cancel amount is not valid!');
    throw {
      message: 'Cancel amount is not valid!',
      statusCode: 500,
    };
  }

  const mappedStatus = getMappedStatus(payload);
  if (mappedStatus === 'FAILED') {
    logger().error(
      '[orderPaymentCancelHandler] Received mappedStatus as :',
      JSON.stringify(mappedStatus),
    );
    await setPayment({ id: payment.id }, { status: mappedStatus });
    throw {
      message: 'Received mapped status as : FAILED',
      statusCode: 500,
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
  return result;
}
