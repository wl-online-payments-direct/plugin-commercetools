import { GetPaymentStatusPayload } from '../types';

export function getPaymentStatusPayload(payload: GetPaymentStatusPayload) {
  const { paymentId } = payload;
  return paymentId;
}
