export interface WebhookPayload {
  id: number;
  merchantReference: string;
  amount: number;
  currencyCode: string;
  status: string;
}
