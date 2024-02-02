import { getPaymentProductsAppHandler } from '@worldline/ctintegration-app';
import { hasRequiredParamsInQueryString } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getPaymentProductsPayload,
  getPaymentProductsRequiredProps,
  getQuery,
} from './mapper';

export async function getPaymentProducts(request: Request) {
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getPaymentProductsRequiredProps(queryString));
  return getPaymentProductsAppHandler(getPaymentProductsPayload(queryString));
}
