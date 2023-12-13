import { PaymentPayload } from './types';
import { orderPaymentHandler } from './lib';

export async function webhookAppHandler(payload: PaymentPayload) {
  if (payload.type === 'payment.created') {
    return orderPaymentHandler(payload);
  }
  return {};
}
