import { getListOrders } from '@worldline/ctintegration-app';
import { hasRequiredParamsInQueryString } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getQuery,
  getListOrdersAppPayload,
  getListOrdersRequiredProps,
} from './mapper';

export async function getListOrdersRequest(request: Request) {
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getListOrdersRequiredProps(queryString));
  return getListOrders(getListOrdersAppPayload(queryString));
}
