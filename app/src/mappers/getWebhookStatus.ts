import { GetWebhookStatusPayload } from '../types';

export function getWebhookStatusDBQuery(payload: GetWebhookStatusPayload) {
  return {
    paymentId: payload?.paymentId,
  };
}

export function getWebhookStatusResponseMapper(payment: { status: string }) {
  const { status = '' } = payment || {};
  return { status };
}
