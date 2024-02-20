import { ICancelPaymentPayload } from '../types';

export function getPaymentCancelServicePayload(
  payload: ICancelPaymentPayload,
  isFinal: boolean,
) {
  const { amount, currencyCode } = payload;

  return {
    amountOfMoney: {
      amount,
      currencyCode,
    },
    isFinal,
  };
}
