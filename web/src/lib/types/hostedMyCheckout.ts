export interface HostedMyCheckoutPayload {
  storeId: string;
  hostedTokenizationId: string;
  tokens?: string;
  returnUrl: string;
}
