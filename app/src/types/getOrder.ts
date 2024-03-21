export interface GetOrderPayload {
  paymentId: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: {
    type: 'centPrecision';
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}
