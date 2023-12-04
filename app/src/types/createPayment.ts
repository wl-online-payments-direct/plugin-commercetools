export interface ICreatePaymentPayload {
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
}
export interface ICreatePaymentResponse {
  redirectURL: string;
}
