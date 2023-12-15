import { getPayment } from '@worldline/ctintegration-db';
import { GetWebhookStatusPayload } from './types';
import {
  getWebhookStatusDBQuery,
  getWebhookStatusResponseMapper,
} from './mappers';

export async function getWebhookStatus(payload: GetWebhookStatusPayload) {
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
