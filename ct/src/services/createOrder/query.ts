const query = `
  mutation($id: String!, $version: Long!) {
    createMyOrderFromCart(draft: {id: $id, version: $version}) {
      orderId: id
      version
      paymentInfo {
        payments {
          id
          version
          transactions {
            id
          }
        }
      }
    }
  }
`;
export default query;
