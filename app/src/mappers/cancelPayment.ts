import { ICancelPaymentPayload } from '../types';

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
