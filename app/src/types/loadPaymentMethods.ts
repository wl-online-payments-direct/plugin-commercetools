export interface LoadPaymentMethodsPayload {
  authToken: string;
  storeId: string;
}

export interface CustomerPaymentToken {
  id: string;
  customerId: string;
  paymentId: string;
  title?: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
