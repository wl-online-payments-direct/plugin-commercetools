export interface ICreateRefundPayload {
  authToken: string;
  orderId: string;
  storeId: string;
  paymentId: string;
  amount: number;
  currencyCode: string;
}

export interface RefundResult {
  isEqual: boolean;
  isGreater: boolean;
}
