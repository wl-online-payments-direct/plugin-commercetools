export interface HostedMyCheckoutPayload {
  paymentProductId?: number;
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  hostedTokenizationId: string;
  storeId: string;
  tokens: string;
  returnUrl: string;
}
export interface HostedCheckoutPayload {
  paymentProductId?: number;
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  cartId: string;
  storeId: string;
  hostedTokenizationId: string;
  tokens: string;
  returnUrl: string;
}
