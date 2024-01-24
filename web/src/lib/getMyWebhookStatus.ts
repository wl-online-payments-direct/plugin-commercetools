import { getMyWebhookStatus } from '@worldline/ctintegration-app';
import { hasAuthHeaderOrThrowError } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getQuery, getMyWebhookStatusAppPayload } from './mapper';

export async function getMyWebhookStatusRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  return getMyWebhookStatus(getMyWebhookStatusAppPayload(request, queryString));
}
