import { QueryParams } from '../types';

export function getListOrdersAppPayload(queryString: QueryParams) {
  const orderId = queryString.orderId?.toString();
  const filterOption = queryString.filterOption?.toString();
  const page = Number(queryString.page);
  const limit = Number(queryString.limit);

  return {
    filterOption,
    orderId,
    page,
    limit,
  };
}
