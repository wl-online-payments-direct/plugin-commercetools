export interface InitiatePaymentPayload {
  authToken: string;
  projectId: string;
  storeId: string;
  cartId: string;
  tokens: string;
  askConsumerConsent: boolean;
}

export interface CreatePaymentPayload {
  authToken: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
}

export interface GetPaymentStatusPayload {
  authToken: string;
  storeId: string;
  paymentId: string;
}
