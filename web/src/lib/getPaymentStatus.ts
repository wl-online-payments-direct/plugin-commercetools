import { getPaymentStatus } from '@worldline/app-integration';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import { getQuery, getPaymentStatusAppPayload } from './mapper';

export async function getPaymentStatusRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(queryString, ['paymentId', 'storeId']);
  return getPaymentStatus(getPaymentStatusAppPayload(request, queryString));
}
