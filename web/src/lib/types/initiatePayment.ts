export interface InitiatePaymentPayload {
  storeId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
