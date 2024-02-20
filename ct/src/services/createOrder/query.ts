const query = `
  mutation($id: String!, $version: Long!, $paymentState: PaymentState) {
    createOrderFromCart(draft: {id: $id, version: $version, paymentState: $paymentState}) {
      id
      version
      paymentState
    }
  }
`;
export default query;
