export interface ICapturePaymentPayload {
  authToken: string;
  storeId: string;
  orderId: string;
  paymentId: string;
  amount: number;
  isFinal: boolean;
}
