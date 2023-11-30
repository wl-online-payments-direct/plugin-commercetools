const query = `
  query ($cartId:String!) {
    cart(id:$cartId){
        id
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
