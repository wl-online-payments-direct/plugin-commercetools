import { getWebhookStatus } from '@worldline/ctintegration-app';
import { hasAuthHeaderOrThrowError } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getQuery, getWebhookStatusAppPayload } from './mapper';

export async function getWebhookStatusRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  return getWebhookStatus(getWebhookStatusAppPayload(request, queryString));
}
