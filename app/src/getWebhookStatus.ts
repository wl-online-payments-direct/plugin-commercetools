import { getPayment } from '@worldline/ctintegration-db';
import { getMyCart } from '@worldline/ctintegration-ct';
import { GetWebhookStatusPayload } from './types';
import {
  getWebhookStatusDBQuery,
  getWebhookStatusResponseMapper,
} from './mappers';

export async function getWebhookStatus(payload: GetWebhookStatusPayload) {
  // Fetch cart from Commercetools to authenticate
  const { cart } = await getMyCart(payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart of cart is missing',
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