import { CreatePaymentType, CreatePaymentResponse } from "./../types/payment";

export function createPaymentResponseMapper(
  result: CreatePaymentType
): CreatePaymentResponse {
  const selectedFields = (({ id, paymentId, status, state }) => ({
    id,
    paymentId,
    status,
    state,
  }))(result);
  return selectedFields;
}
