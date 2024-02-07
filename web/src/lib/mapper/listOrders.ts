import { QueryParams } from '../types';

export function getListOrdersAppPayload(queryString: QueryParams) {
  const orderId = queryString.orderId?.toString();
  const page = Number(queryString.page) || 1;
  return {
    orderId,
    page,
  };
}
