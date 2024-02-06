import { getListOrders } from '@worldline/ctintegration-app';
import { Request } from './types';
import { getQuery, getListOrdersAppPayload } from './mapper';

export async function getListOrdersRequest(request: Request) {
  const queryString = getQuery(request);
  return getListOrders(getListOrdersAppPayload(queryString));
}
