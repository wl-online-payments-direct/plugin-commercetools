import { getPayment } from '@worldline/ctintegration-db';
import { getMyCart } from '@worldline/ctintegration-ct';
import { GetMyWebhookStatusPayload } from './types';
import {
  getWebhookStatusDBQuery,
  getWebhookStatusResponseMapper,
} from './mappers';

export async function getMyWebhookStatus(payload: GetMyWebhookStatusPayload) {
  // Fetch cart from Commercetools to authenticate
  const { cart } = await getMyCart(payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart or cart is missing',
      statusCode: 500,
    };
  }
  // Invoke db to get payment status
  const payment = await getPayment(getWebhookStatusDBQuery(payload));

  if (!payment) {
    throw {
      message: `Failed to fetch the payment for id : '${payload.paymentId}'`,
      statusCode: 500,
    };
  }

  return getWebhookStatusResponseMapper(payment);
}
