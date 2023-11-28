import { handleWebhook } from '@worldline/app-integration';
import { Request } from './types';
import { getWebhookPayload } from './mapper';

export async function webhook(request: Request) {
  // Pass webhook request to the app
  const result = await handleWebhook(getWebhookPayload(request));
  return result;
}
