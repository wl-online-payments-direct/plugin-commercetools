export interface HostedMyCheckoutPayload {
  paymentProductId?: number;
  authToken: string;
  userAgent: string;
  acceptHeader: string;
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
  tokens: string;
  returnUrl: string;
}
