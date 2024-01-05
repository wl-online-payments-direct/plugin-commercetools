export interface LoadPaymentMethodsPayload {
  authToken: string;
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
