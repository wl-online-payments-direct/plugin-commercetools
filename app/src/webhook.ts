import {
  Cart,
  createOrder,
  createPayment,
  getCartById,
  getClientCredentialsToken,
  getCustomObjects,
  updateCart,
} from '@worldline/ctintegration-ct';
import { getPayment, setPayment } from '@worldline/ctintegration-db';
import { retry } from '@worldline/ctintegration-util';
import { WebhookPayload } from './types';
import {
  getPaymentDBPayload,
  getPaymentFilterQuery,
  getPaymentUpdateQuery,
  validateWebhookPayload,
  getCreateOrderCTPayload,
  getCreatePaymentCTPayload,
  getUpdateCartPayload,
  getConnectionServiceProps,
} from './mappers';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { getPaymentStatusPayload } from './mappers/getPaymentStatus';

const createOrderWithPayment = async (cart: Cart) => {
  // Create order and payment
  const ctPayment = await createPayment(getCreatePaymentCTPayload(cart));

  // Mutate cart for add payment
  const { hasErrDueConcurrentModification, updatedCart } = await updateCart(
    getUpdateCartPayload(cart, ctPayment),
  );

  if (hasErrDueConcurrentModification) {
    return { isRetry: true };
  }

  // Get access token
  const token = await getClientCredentialsToken();

  const ctOrder = await createOrder(
    getCreateOrderCTPayload(updatedCart, token),
  );

  return { isRetry: false, data: ctOrder };
};

export async function orderPaymentHandler(payload: WebhookPayload) {
  // Get db payment
  const payment = await getPayment(getPaymentDBPayload(payload));
  if (!payment) {
    throw {
      message: `Failed to fetch the payment with merchant reference '${payload.merchantReference}'!`,
      statusCode: 500,
    };
  }

  // Fetch cart from Commercetools
  const cart = await getCartById(payment.cartId);
  if (!cart) {
    await setPayment({ id: payment.id }, { status: 'IN_REVIEW' });
    // TODO: store the error message in database.
    throw {
      message: `Cart '${payment.cartId}' is missing!`,
      statusCode: 500,
    };
  }

  // Validate the webhook payload
  validateWebhookPayload(payload, cart, payment);

  return retry(async () => {
    if (payload.status === 'CREATED') {
      await setPayment(
        { id: payment.id },
        { status: 'SUCCESS', state: 'PROCESSING' },
      );
      // create order and payment
      const result = await createOrderWithPayment(cart);
      // update order id and reset the state as DEFAULT
      await setPayment(getPaymentFilterQuery(payment), {
        ...(result.data ? { orderId: result.data.id } : {}),
        state: 'DEFAULT',
      });
      return result;
    }

    // if orderId is not found in the database against payment

    // If orderId is found:
    // fetch payment info from PSP
    // const pspPayment = await getPaymentStatusService(
    //   getConnectionServiceProps(await getCustomObjects(payment.storeId)),
    //   getPaymentStatusPayload(payment),
    // );
    // // update payment
    return null;
  });
}
