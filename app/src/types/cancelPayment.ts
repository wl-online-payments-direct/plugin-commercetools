export interface ICancelPaymentPayload {
  authToken: string;
  orderId: string;
  storeId: string;
  paymentId: string;
  amount: number;
  currencyCode: string;
}
