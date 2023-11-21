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
  projectId: string;
  storeId: string;
  hostedTokenizationId: string;
}
