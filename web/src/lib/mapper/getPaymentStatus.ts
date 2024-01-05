import { QueryParams, Request } from '../types';

import { pick } from './common';

export function getPaymentStatusRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['id', 'storeId']);
}

export function getPaymentStatusAppPayload(
  request: Request,
  queryString: QueryParams,
) {
  const id = queryString.id?.toString();
  const storeId = queryString.storeId?.toString();
  const { authorization: authToken = '' } = request.headers;

  return {
    id,
    storeId,
    authToken,
  };
}
