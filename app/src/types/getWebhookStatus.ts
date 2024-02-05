export interface GetMyWebhookStatusPayload {
  authToken: string;
  paymentId: string;
}

export interface GetWebhookStatusPayload {
  authToken: string;
  paymentId: string;
  cartId: string;
}
