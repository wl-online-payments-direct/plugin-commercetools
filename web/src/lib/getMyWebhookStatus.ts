import { getMyWebhookStatus } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getQuery,
  getMyWebhookStatusAppPayload,
  getMyWebhookStatusRequiredProps,
} from './mapper';

export async function getMyWebhookStatusRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getMyWebhookStatusRequiredProps(queryString));
  return getMyWebhookStatus(getMyWebhookStatusAppPayload(request, queryString));
}
