const getMutation = () => `
  mutation (
      $paymentId:String!,
      $paymentVersion: Long!,
      $methodInfoName: String!,
      $methodInfoLocale: Locale!,
    ) {
      # Payment update actions
      updatePayment: updatePayment(
        # The current version of the Payment.
        version: $paymentVersion
    
        # The id of the Customer to update.
        id: $paymentId
    
        # An array of update actions.
        actions: [
          {
            # The action to change the method info name.
            setMethodInfoName:{
              name:{
                locale:$methodInfoLocale,
                value:$methodInfoName
              }
            }
          },
        ]
      ) {
        # Return the id, version
        id
        version
      }
    }
  `;

export default getMutation;
