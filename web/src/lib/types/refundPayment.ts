export interface RefundPaymentPayload {
  orderId: string;
  storeId: string;
  amount: number;
  currencyCode: string;
  paymentId: string;
}
