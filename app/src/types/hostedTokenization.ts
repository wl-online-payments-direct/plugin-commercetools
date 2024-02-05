export interface HostedTokenizationPayload {
  authToken: string;
  storeId: string;
  cartId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
