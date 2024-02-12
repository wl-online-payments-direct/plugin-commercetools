const query = `
query ($paymentId:String!) {
  payment(id:$paymentId){
      id
      version
      amountPlanned{
        centAmount
        currencyCode
      }
  }
}
`;
export default query;
