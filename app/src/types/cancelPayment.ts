export interface ICancelPaymentPayload {
  authToken: string;
  orderId: string;
  storeId: string;
  paymentId: string;
  isFinal: boolean;
  amount: number;
  currencyCode: string;
}
