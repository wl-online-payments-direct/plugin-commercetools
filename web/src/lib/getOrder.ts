import { getOrder } from '@worldline/ctintegration-app';
import { hasRequiredParamsInQueryString } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getQuery, getOrderAppPayload, getOrderRequiredProps } from './mapper';

export async function getOrderRequest(request: Request) {
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getOrderRequiredProps(queryString));
  return getOrder(getOrderAppPayload(queryString));
}
