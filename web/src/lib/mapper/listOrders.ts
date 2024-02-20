import { QueryParams } from '../types';

import { pick } from './common';

export function getListOrdersRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['storeId']);
}

export function getListOrdersAppPayload(queryString: QueryParams) {
  const storeId = queryString.storeId?.toString();
  const orderId = queryString.orderId?.toString();
  const page = Number(queryString.page);
  const limit = Number(queryString.limit);
  const filterOption = queryString.filterOption?.toString();

  return {
    orderId,
    storeId,
    page,
    limit,
    filterOption,
  };
}
