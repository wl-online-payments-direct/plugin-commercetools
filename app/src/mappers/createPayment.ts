export async function createPaymentMapper(result: {
  paymentId:string;
  status:string;
  state:string;
}) {
  const selectedFields = (({ paymentId, status, state }) => ({
    paymentId,
    status,
    state,
  }))(result);
  return selectedFields;
}
