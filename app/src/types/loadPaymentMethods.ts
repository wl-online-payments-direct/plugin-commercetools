export interface LoadPaymentMethodsPayload {
  authToken: string;
  storeId: string;
  cartId: string;
}

export interface LoadPaymentMethodsCustomerPaymentToken {
  id: string;
  customerId: string;
  paymentId: string;
  paymentProductId: number;
  title?: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
