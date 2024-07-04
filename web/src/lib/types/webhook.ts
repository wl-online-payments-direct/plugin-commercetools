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
          bin: string;
        };
        fraudResults: {
          fraudServiceResult: string;
        };
        threeDSecureResults: {
          eci: string;
          liability: string;
          authenticationStatus: string;
        };
        token: string;
      };
      redirectPaymentMethodSpecificOutput: {
        paymentProductId: number;
        token: string;
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
