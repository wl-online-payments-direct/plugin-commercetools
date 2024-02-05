export interface InitiatePaymentPayload {
  storeId: string;
  cartId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
