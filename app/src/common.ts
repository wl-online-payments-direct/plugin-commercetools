import {
  Cart,
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
  getUpdateCartPayload,
  getMappedStatus,
  hasEqualAmounts,
  isPaymentProcessing,
} from './mappers';

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

      if (mappedStatus === 'FAILED') {
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
        { status: mappedStatus, state: 'PROCESSING' },
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
        state: 'DEFAULT',
      });

      return { isRetry: false, data: result };
    } catch (error) {
      // If any exception happens, reset to default state
      await setPayment(getPaymentFilterQuery(dbPayment), {
        state: 'DEFAULT',
      });
      throw error;
    }
  });
}
