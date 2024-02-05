const query = `
  mutation ($draft: PaymentDraft!) {
    createPayment(draft: $draft) {
      id
      version
    }
  }
`;
export default query;
