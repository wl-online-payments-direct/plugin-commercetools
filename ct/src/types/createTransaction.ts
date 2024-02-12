import { Payment, ErrorObject } from '@commercetools/platform-sdk';

export interface UpdatePayment {
  body: {
    data: {
      updatePayment: Payment;
    };
    errors: ErrorObject[];
  };
}
