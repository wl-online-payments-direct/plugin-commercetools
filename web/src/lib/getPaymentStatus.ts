import { getPaymentStatus } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getQuery,
  getPaymentStatusRequiredProps,
  getPaymentStatusAppPayload,
} from './mapper';

export async function getPaymentStatusRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getPaymentStatusRequiredProps(queryString));
  return getPaymentStatus(getPaymentStatusAppPayload(request, queryString));
}
