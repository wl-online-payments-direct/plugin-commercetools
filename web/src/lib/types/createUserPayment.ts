export interface CreateUserPaymentPayload {
  cartId: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
}
