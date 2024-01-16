export interface CreateCustomerPaymentTokenRequest {
  customerId: string;
  paymentId: string;
  token: string;
  title: string;
}
