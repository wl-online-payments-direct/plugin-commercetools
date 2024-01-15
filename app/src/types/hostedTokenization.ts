export interface HostedTokenizationPayload {
  authToken: string;
  storeId: string;
  tokens: string;
  askConsumerConsent: boolean;
}
