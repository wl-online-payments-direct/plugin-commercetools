export interface HostedTokenizationPayload {
  locale?: string;
  variant: string;
  tokens: string;
  askConsumerConsent: boolean;
}

export interface HostedTokenizationServiceResponse {
  hostedTokenizationId: string;
  partialRedirectUrl: string;
  hostedTokenizationUrl: string;
  invalidTokens: string;
  expiredCardTokens: string;
}

export interface HostedTokenizationResponse {
  hostedTokenizationId: string;
  hostedTokenizationUrl: string;
}
