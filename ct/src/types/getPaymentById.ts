import { Payment, ErrorObject } from '@commercetools/platform-sdk';

export interface PaymentById {
  body: {
    data: {
      payment: Payment;
    };
    errors: ErrorObject;
  };
}
