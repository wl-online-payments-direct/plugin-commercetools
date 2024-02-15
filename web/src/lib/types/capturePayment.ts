export interface CapturePaymentPayload {
  storeId: string;
  amount: number;
  paymentId: string;
  isFinal: boolean;
}
