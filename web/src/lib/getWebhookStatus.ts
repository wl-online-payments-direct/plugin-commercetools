import { getWebhookStatus } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getQuery,
  getWebhookStatusAppPayload,
  getWebhookStatusRequiredProps,
} from './mapper';

export async function getWebhookStatusRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getWebhookStatusRequiredProps(queryString));
  return getWebhookStatus(getWebhookStatusAppPayload(request, queryString));
}
