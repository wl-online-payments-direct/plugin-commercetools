const query = `
  mutation ($draft: MyPaymentDraft!) {
    createMyPayment(draft: $draft) {
      paymentId: id
      version
    }
  }
`;
export default query;
