import { ICancelPaymentPayload, ICaptureDbPaymentPayload } from '../types';

export function getPaymentCancelServicePayload(payload: ICancelPaymentPayload) {
  const { amount, isFinal, currencyCode } = payload;

  return {
    amountOfMoney: {
      amount,
      currencyCode,
    },
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
