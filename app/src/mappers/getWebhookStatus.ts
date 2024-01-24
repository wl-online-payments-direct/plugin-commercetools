import { GetMyWebhookStatusPayload } from '../types';

export function getWebhookStatusDBQuery(payload: GetMyWebhookStatusPayload) {
  return {
    id: payload?.paymentId,
  };
}

export function getWebhookStatusResponseMapper(payment: { status: string }) {
  const { status = '' } = payment || {};
  return { status };
}
