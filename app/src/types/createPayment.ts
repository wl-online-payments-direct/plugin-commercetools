export interface ICreatePaymentPayload {
  authToken: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
}
export interface ICreatePaymentResponse {
  redirectURL: string;
}
