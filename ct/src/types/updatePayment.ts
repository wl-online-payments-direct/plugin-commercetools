import { ErrorObject, Order, Payment } from '@commercetools/platform-sdk';

export interface UpdatePaymentPayload {
  orderId: string;
  version: number;
}

export interface UpdatePaymentResponse {
  body: {
    data: {
      updateOrder: Order;
      updatePayment: Payment;
    };
    errors: ErrorObject[];
  };
}
