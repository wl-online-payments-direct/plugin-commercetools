export interface ICapturePaymentPayload {
  authToken: string;
  storeId: string;
  paymentId: string;
  amount: number;
  isFinal: boolean;
}
