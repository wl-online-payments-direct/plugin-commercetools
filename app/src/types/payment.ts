export interface InitiatePaymentSessionPayload {
  projectId: string;
  storeId: string;
  cartId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
