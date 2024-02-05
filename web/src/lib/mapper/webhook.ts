import { PaymentPayload, Request } from '../types';

export function getWebhookAppPayload(request: Request) {
  const signature = request?.headers['x-gcs-signature']?.toString() || '';
  const payload = (request?.body || {}) as PaymentPayload;
  return {
    payload,
    signature,
  };
}
