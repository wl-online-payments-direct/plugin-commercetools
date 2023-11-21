export interface CreatePaymentPayload {
  order: {
    customer: {
      merchantCustomerId: string;
    };
    amountOfMoney: {
      amount: number;
      currencyCode: string;
    };
  };
}

export interface CreatePaymentResponse {
  id: number;
}
