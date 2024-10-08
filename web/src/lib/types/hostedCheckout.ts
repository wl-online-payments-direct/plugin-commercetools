export interface HostedCheckoutPayload {
  paymentProductId?: number;
  paymentMethod?: string;
  storeId: string;
  cartId: string;
  tokens?: string;
  returnUrl: string;
}
