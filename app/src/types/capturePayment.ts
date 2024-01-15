export interface ICapturePaymentPayload {
  authToken: string;
  storeId: string;
  orderId: string;
  paymentId: string;
  amount: number;
  isFinal: boolean;
}

export interface ICaptureDbPaymentPayload {
  id: string;
  storeId: string;
  orderId: string;
  paymentId: string;
  worldlineId: string;
}
