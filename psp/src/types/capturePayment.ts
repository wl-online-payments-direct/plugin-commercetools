export interface CapturePaymentRequest {
  amount: number;
  isFinal: boolean;
}

export interface CapturePaymentResponse {
  id: string;
  status: string;
}
