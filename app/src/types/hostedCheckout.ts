export interface HostedMyCheckoutPayload {
  paymentProductId?: number;
  paymentMethod?: string;
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  storeId: string;
  tokens: string;
  returnUrl: string;
}
export interface HostedCheckoutPayload {
  paymentProductId?: number;
  paymentMethod?: string;
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  cartId: string;
  storeId: string;
  tokens: string;
  returnUrl: string;
}
