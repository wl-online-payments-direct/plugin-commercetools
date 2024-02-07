import { ICapturePaymentPayload } from '../types';

export function getCaptureServicePayload(payload: ICapturePaymentPayload) {
  const { amount, isFinal } = payload;

  return {
    amount,
    isFinal,
  };
}
