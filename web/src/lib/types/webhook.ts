export interface WebhookPayload {
  id: number;
  status: string;
  merchantReference: string;
  amount: number;
  currencyCode: string;
}
