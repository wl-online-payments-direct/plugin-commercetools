const getQuery = (shouldIncludeInterfaceId: boolean) => `
  mutation (
      $orderId: String!,
      $orderVersion: Long!,
      $paymentId:String!,
      $paymentVersion: Long!,
      $methodInfoName: String!,
      $methodInfoLocale: Locale!,
      ${shouldIncludeInterfaceId ? '$interfaceId: String!,' : ''}
      $orderState: OrderState!,
      $orderPaymentState: PaymentState!,
    ) {
      # Order update action
      updateOrder: updateOrder(
        id:$orderId
        version:$orderVersion
        actions:[{
          changeOrderState: {
            orderState: $orderState
          }
        },
        {
          changePaymentState: {
            paymentState: $orderPaymentState
          }
        }]
      ){
        id
        version
      }
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
          ${
            shouldIncludeInterfaceId
              ? `
              {
                setInterfaceId:{
                  interfaceId:$interfaceId
                }
              },
              `
              : ''
          }
        ]
      ) {
        # Return the id, version
        id
        version
      }
    }
  `;

export default getQuery;
