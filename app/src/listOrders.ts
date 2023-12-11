import { getDBOrders } from '@worldline/ctintegration-db';
import { ListOrdersPayload } from './types';

export async function getListOrders(payload: ListOrdersPayload) {
  return getDBOrders(payload);
}
