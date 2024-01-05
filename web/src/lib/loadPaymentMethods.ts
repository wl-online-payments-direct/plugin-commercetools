import { loadPaymentMethodsAppHandler } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getPaymentMethodsAppPayload,
  getPaymentMethodsRequiredProps,
  getQuery,
} from './mapper';

export async function loadPaymentMethods(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getPaymentMethodsRequiredProps(queryString));
  return loadPaymentMethodsAppHandler(
    getPaymentMethodsAppPayload(request, queryString),
  );
}
