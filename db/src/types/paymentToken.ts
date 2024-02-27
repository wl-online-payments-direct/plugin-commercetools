export interface CreateCustomerPaymentTokenRequest {
  customerId: string;
  paymentId: string;
  paymentProductId: number;
  token: string;
  title: string;
}
