export interface initiatePaymentSessionType {
  authToken: string;
  projectId: string;
  storeId: string;
  cartId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
