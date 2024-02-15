import { ICreateRefundPayload } from '../types';

export function getRefundServicePayload(payload: ICreateRefundPayload) {
  const { amount, currencyCode } = payload;
  return {
    amountOfMoney: {
      amount,
      currencyCode,
    },
  };
}
