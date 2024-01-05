import { GetPaymentStatusPayload } from '../types';

export function getPaymentStatusDBPayload(payload: GetPaymentStatusPayload) {
  const { id = '' } = payload || {};
  return { id };
}
