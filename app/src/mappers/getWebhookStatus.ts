import { GetWebhookStatusPayload } from '../types';

export function getWebhookStatusDBQuery(payload: GetWebhookStatusPayload) {
  return {
    id: payload?.paymentId,
  };
}

export function getWebhookStatusResponseMapper(payment: { status: string }) {
  const { status = '' } = payment || {};
  return { status };
}
