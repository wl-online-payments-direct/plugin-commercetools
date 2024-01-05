import {
  Cart,
  Order,
  Payment,
  createOrder,
  createPayment,
  getCartById,
  getClientCredentialsToken,
  getOrderById,
  updateCart,
  updatePayment,
} from '@worldline/ctintegration-ct';
import { getPayment, setPayment } from '@worldline/ctintegration-db';
import { logger, retry } from '@worldline/ctintegration-util';
import { PaymentPayload } from './types';
import {
  getPaymentDBPayload,
  getPaymentFilterQuery,
  getCreateOrderCTPayload,
  getCreatePaymentCTPayload,
  getUpdateCartPayload,
  getMappedStatus,
  hasEqualAmounts,
  isPaymentProcessing,
} from './mappers';

export const resolveOrderPayment = (order: Order): Payment => {
  const payments = (order?.paymentInfo?.payments || []) as unknown as Payment[];
  const sortedPayments = payments.sort(
    (a, b) =>
      new Date(b.lastModifiedAt).getTime() -
      new Date(a.lastModifiedAt).getTime(),
  );
  const [payment] = sortedPayments;
  // return last modified payment
  return payment;
};

const createOrderWithPayment = async (cart: Cart) => {
  // Create order and payment
  const ctPayment = await createPayment(getCreatePaymentCTPayload(cart));

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
  orderId: string,
  payload: PaymentPayload,
) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw {
      message: `Failed to fetch the order with id '${orderId}'`,
      statusCode: 500,
    };
  }

  const payment = resolveOrderPayment(order);

  // Mutate cart for update payment
  const { updatedOrder } = await updatePayment(order, payment, payload);

  return { order: updatedOrder };
};

export async function orderPaymentHandler(payload: PaymentPayload) {
  // log the payload
  logger().debug(`[orderPaymentHandler]:payload: ${JSON.stringify(payload)}`);

  return retry(async () => {
    // Fetch DB payment
    const payment = await getPayment(getPaymentDBPayload(payload));

    if (!payment) {
      logger().error('Failed to fetch the payment');
      return { isRetry: true };
    }

    try {
      // Fetch CT cart
      const cart = await getCartById(payment.cartId);
      if (!cart) {
        await setPayment({ id: payment.id }, { status: 'IN_REVIEW' });
        // TODO: store the error message in database.

        logger().error(`Cart '${payment.cartId}' is missing!`);
        return { isRetry: true };
      }

      if (hasEqualAmounts(payload, cart)) {
        // TODO: send a notification to admin and add a column to save the reason
        logger().error('Cart amount doesnt match with the paid amount');
        return { isRetry: true };
      }

      if (isPaymentProcessing(payment.state)) {
        logger().error(
          `Failed to process the payment as it is already in '${payment.state}' state!`,
        );
        return { isRetry: true };
      }

      const mappedStatus = getMappedStatus(payload);

      if (mappedStatus === 'FAILED') {
        await setPayment({ id: payment.id }, { status: mappedStatus });
        return {
          isRetry: false,
          data: {
            message: `Updated payment status as ${mappedStatus} as we received status as ${payload.payment.status}`,
          },
        };
      }

      await setPayment(
        { id: payment.id },
        { status: mappedStatus, state: 'PROCESSING' },
      );

      let result;
      // if order id exists
      if (payment.orderId) {
        // update order and payment
        result = await updateOrderWithPayment(payment.orderId, payload);
      } else {
        // create order and payment
        result = await createOrderWithPayment(cart);
      }
      // update order id and reset the state as DEFAULT
      await setPayment(getPaymentFilterQuery(payment), {
        ...(!payment.orderId && result?.order?.id
          ? { orderId: result.order.id }
          : {}),
        state: 'DEFAULT',
      });

      return { isRetry: false, data: result };
    } catch (error) {
      // If any exception happens, reset to default state
      await setPayment(getPaymentFilterQuery(payment), {
        state: 'DEFAULT',
      });
      throw error;
    }
  });
}
