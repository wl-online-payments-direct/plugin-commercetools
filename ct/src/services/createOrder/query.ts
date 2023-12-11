const query = `
  mutation($id: String!, $version: Long!) {
    createOrderFromCart(draft: {id: $id, version: $version}) {
      id
      version
      taxedPrice{
        totalGross{
          currencyCode
          centAmount
        }
      }
    }
  }
`;
export default query;
