export interface HostedTokenizationPayload {
  locale: string;
  variant: string;
  tokens: string;
  askConsumerConsent: boolean;
}

export interface HostedTokenizationResponse {
  hostedTokenizationUrl: string;
}
