export interface CancelPaymentRequest {
  amountOfMoney: {
    amount: number;
    currencyCode: string;
  };
  isFinal: boolean;
}

export interface CancelPaymentResponse {
  id: string;
  status: string;
}
