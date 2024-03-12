export interface DeleteTokenPayload {
  storeId: string;
  customerPaymentTokenId: string;
  customerEmail?: string;
  customerId?: string;
}
