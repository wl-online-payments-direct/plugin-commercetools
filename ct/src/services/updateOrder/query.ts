export const orderPaymentStatusQuery = `
mutation ($id: String, $version: Long!, $orderState: OrderState!, $paymentState: PaymentState!) {
    updateOrder(
      id: $id,
      version: $version,
      actions: [
        {
          changeOrderState: {
            orderState: $orderState
          }
        },
        {
          changePaymentState: {
            paymentState: $paymentState
          }
        }
      ]
    ) {
      id
      version
      orderState
      paymentState
    }
  }
`;

export const orderStatusQuery = `
mutation ($id: String, $version: Long!,$orderState: OrderState!) {
    updateOrder(
      id: $id,
      version:  $version,
      actions: [
        {
        changeOrderState: {
          orderState: $orderState
        }
      }
      ]
    ) {
      id
      version
    	orderState
      paymentState
    }
  }
`;
