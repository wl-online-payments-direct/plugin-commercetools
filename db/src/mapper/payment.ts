import { Payment } from '../types';

export function incrementedPaymentIdMapper(result: Payment | null): {
  incrementedPaymentId: number;
} {
  const INITIAL_VALUE = 100000;

  if (!result || !result?.paymentId) {
    return { incrementedPaymentId: INITIAL_VALUE };
  }

  const [, paymentId] = result.paymentId.split('-');

  const incrementedPaymentId = Number(paymentId) + 1;

  return { incrementedPaymentId };
}
