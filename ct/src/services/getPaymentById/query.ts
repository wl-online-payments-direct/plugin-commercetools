const query = `
query ($paymentId:String!) {
  payment(id:$paymentId){
      id
      version
      amountPlanned{
        centAmount
        currencyCode
      }
    transactions {
      id
      type
      amount {
        type
        currencyCode
        centAmount
        fractionDigits
      }
    }
  }
}
`;
export default query;
