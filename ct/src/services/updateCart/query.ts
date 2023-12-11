const query = `
 mutation ($id: String, $version: Long!, $paymentId:String!) {
    updateCart(
      id: $id,
      version: $version,
      actions:[{
        addPayment:{
          payment:{
            id: $paymentId
          }
        }
      }]
    ){
      id
      version
    }
  }
`;
export default query;
