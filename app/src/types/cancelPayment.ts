export interface ICancelPaymentPayload {
  authToken: string;
  orderId: string;
  storeId: string;
  paymentId: string;
  isFinal: boolean;
  amount: number;
  currencyCode: string;
}

export interface ICaptureDbPaymentPayload {
  id: string;
  storeId: string;
  orderId: string;
  paymentId: string;
  worldlineId: string;
}
