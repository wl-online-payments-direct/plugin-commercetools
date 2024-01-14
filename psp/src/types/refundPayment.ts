export interface RefundPaymentRequest {
  amountOfMoney: {
    amount: number;
    currencyCode: string;
  };
}
export interface RefundPaymentResponse {
  id: string;
  status: string;
}
