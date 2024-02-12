export interface CancelPaymentPayload {
  orderId: string;
  storeId: string;
  amount: number;
  currencyCode: string;
  paymentId: string;
  isFinal: boolean;
}
