import { RetryPaymentStatusPayload } from '../types';

export function retryPaymentStatusPayload(payload: RetryPaymentStatusPayload) {
  const { id } = payload;
  return { id };
}
