export interface DeleteTokenAppPayload {
  storeId: string;
  customerPaymentTokenId: string;
  customerEmail?: string;
  customerId?: string;
}
