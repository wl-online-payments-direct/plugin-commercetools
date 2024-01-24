export interface HostedCheckoutPayload {
  storeId: string;
  cartId: string;
  tokens?: string;
  returnUrl: string;
}
