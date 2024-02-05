import { GetMyWebhookStatusPayload } from '../types';

export function getWebhookStatusDBQuery(payload: GetMyWebhookStatusPayload) {
  return {
    paymentId: payload?.paymentId,
  };
}

export function getWebhookStatusResponseMapper(payment: {
  status: string;
  orderId: string;
}) {
  const { orderId = '', status = '' } = payment || {};
  return { orderId, status };
}
