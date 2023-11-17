export interface InitiatePayment {
  projectId: string;
  storeId: string;
  cartId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
