import { ErrorObject, Payment } from '@commercetools/platform-sdk';

export interface CreatePaymentPayload {
  centAmount: number;
  currencyCode: string;
}

export interface CreatePaymentResponse {
  body: {
    data: {
      createPayment: Payment;
    };
    errors: ErrorObject;
  };
}
