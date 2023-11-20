const query = `
  query ($cartId:String!) {
    cart(id:$cartId){
        id
        version
        locale
        country
    }
  }
`;
export default query;
