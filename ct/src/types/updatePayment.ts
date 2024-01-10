import { ErrorObject, Order, Payment } from '@commercetools/platform-sdk';

export interface PaymentPayload {
  payment: {
    paymentOutput: {
      amountOfMoney: {
        amount: number;
        currencyCode: string;
      };
      references: {
        merchantReference: string;
      };
      cardPaymentMethodSpecificOutput: {
        paymentProductId: number;
        card: {
          cardNumber: string;
          expiryDate: string;
        };
        fraudResults: {
          fraudServiceResult: string;
        };
        threeDSecureResults: {
          eci: string;
        };
      };
      paymentMethod: string;
    };
    status: string;
    statusOutput: {
      isCancellable: boolean;
      statusCategory: string;
      statusCode: number;
      isAuthorized: boolean;
      isRefundable: boolean;
    };
    id: string;
  };
  type?: string;
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
