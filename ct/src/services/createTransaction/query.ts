const query = `
mutation (
    $id:String!,
    $version: Long!,
    $amount: MoneyInput!,
    $time: DateTime!,
    $type:TransactionType!) {
      updatePayment: updatePayment(
            version: $version
            id: $id
        
            # An array of update actions.
            actions: [
              {
                addTransaction:{ 
                
                 transaction:{
                  timestamp: $time,
                  type: $type
                  amount: $amount
                }
                
                }
              }
            ]
          ) {
            # Return the id, version
            id
            version
          }
    }
    
`;
export default query;
