import { Payment, PaymentReference, CreatePaymentResponse } from '../types';

export function createPaymentResponseMapper(
  result: Payment,
): CreatePaymentResponse {
  const selectedFields = (({ id, status, state }) => ({
    id,
    status,
    state,
  }))(result);
  return selectedFields;
}

export function getIncrementedReferenceMapper(result: PaymentReference) {
  const selectedFields = (({ storeId, version, referenceId }) => ({
    storeId,
    version,
    referenceId,
  }))(result);
  return selectedFields;
}
