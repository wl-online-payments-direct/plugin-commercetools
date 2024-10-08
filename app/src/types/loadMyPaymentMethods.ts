export interface LoadMyPaymentMethodsPayload {
  authToken: string;
  storeId: string;
}

export interface CustomerPaymentToken {
  id: string;
  customerId: string;
  paymentId: string;
  paymentProductId: number;
  title?: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
