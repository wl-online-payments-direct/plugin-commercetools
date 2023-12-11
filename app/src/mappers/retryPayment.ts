import { RetryPaymentStatusPayload } from '../types';

export function retryPaymentStatusPayload(payload: RetryPaymentStatusPayload) {
  const { paymentId } = payload;
  return paymentId;
}
