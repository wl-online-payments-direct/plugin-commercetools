import { GetPaymentStatusPayload } from '../types';

export function getPaymentStatusDBPayload(payload: GetPaymentStatusPayload) {
  const { id = '' } = payload || {};
  return { paymentId: id };
}

export function getPaymentStatusResponseMapper(
  payload: { status: string },
  payment: { orderId: string },
) {
  const { status = '' } = payload || {};
  const { orderId = '' } = payment || {};
  return { orderId, status };
}
