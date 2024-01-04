import { webhookAppHandler } from '@worldline/ctintegration-app';
import { PaymentPayload, Request } from './types';

export async function webhook(request: Request) {
  // Pass webhook request to the app
  const body = request?.body as PaymentPayload;
  return webhookAppHandler(body);
}
