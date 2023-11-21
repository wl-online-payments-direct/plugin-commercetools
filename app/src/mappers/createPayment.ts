export async function createPaymentMapper(result: any) {
  const selectedFields = (({ paymentId, status, state }) => ({
    paymentId,
    status,
    state,
  }))(result);
  return selectedFields;
}
