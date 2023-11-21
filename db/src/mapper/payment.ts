import { Payment, CreatePaymentResponse } from "./../types";

export function createPaymentResponseMapper(
  result: Payment
): CreatePaymentResponse {
  const selectedFields = (({ id, paymentId, status, state }) => ({
    id,
    paymentId,
    status,
    state,
  }))(result);
  return selectedFields;
}

export function incrementedPaymentIdMapper(result: Payment | null): {
  incrementedPaymentId: number;
} {
  const INITIAL_VALUE = 100000;

  if (!result) {
    return { incrementedPaymentId: INITIAL_VALUE };
  }

  let [_merchantReference, paymentId] = result?.paymentId?.split("-");

  const incrementedPaymentId = Number(paymentId) + 1;

  return { incrementedPaymentId };
}
