export interface HostedCheckoutPayload {
  paymentProductId?: number;
  paymentMethod: string;
  hostedTokenizationId: string;
  storeId: string;
  cartId: string;
  tokens?: string;
  returnUrl: string;
}
