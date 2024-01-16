const query = `
  query ($cartId:String!) {
    cart(id:$cartId){
        id
        customerId
        version
        locale
        country
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
