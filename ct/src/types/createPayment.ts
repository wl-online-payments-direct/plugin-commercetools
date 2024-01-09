import { ErrorObject, Payment } from '@commercetools/platform-sdk';

export interface CreatePaymentPayload {
  paymentId: string;
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
