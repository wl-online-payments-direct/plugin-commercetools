import { webhookAppHandler } from '@worldline/ctintegration-app';
import { Request } from './types';
import { getWebhookAppPayload } from './mapper';

export async function webhook(request: Request) {
  // Pass webhook request to the app
  return webhookAppHandler(getWebhookAppPayload(request));
}
