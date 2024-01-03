import { ICapturePaymentPayload, ICaptureDbPaymentPayload } from '../types';

export function getCaptureServicePayload(payload: ICapturePaymentPayload) {
  const { amount, isFinal } = payload;

  return {
    amount,
    isFinal,
  };
}

export function getCaptureDatabasePayload(
  payload: ICaptureDbPaymentPayload,
  amount: number,
  status: string,
  type: string,
) {
  const { storeId, orderId, paymentId, worldlineId } = payload;
  return {
    paymentId,
    storeId,
    orderId,
    worldlineId,
    type,
    amount,
    status,
  };
}
