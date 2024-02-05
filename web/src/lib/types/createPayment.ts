export interface CreatePaymentPayload {
  cartId: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
}
