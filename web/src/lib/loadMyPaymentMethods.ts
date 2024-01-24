import { loadMyPaymentMethodsAppHandler } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getMyPaymentMethodsAppPayload,
  getMyPaymentMethodsRequiredProps,
  getQuery,
} from './mapper';

export async function loadMyPaymentMethods(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getMyPaymentMethodsRequiredProps(queryString));
  return loadMyPaymentMethodsAppHandler(
    getMyPaymentMethodsAppPayload(request, queryString),
  );
}
