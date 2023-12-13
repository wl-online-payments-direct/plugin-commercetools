import { webhookAppHandler } from '@worldline/ctintegration-app';
import { Request } from './types';

export async function webhook(request: Request) {
  // Pass webhook request to the app
  return webhookAppHandler(request.body);
}
