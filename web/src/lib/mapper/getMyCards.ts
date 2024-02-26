import { QueryParams, Request } from '../types';
import { pick } from './common';

export function getMyCardsRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['storeId']);
}

export function getMyCardsAppPayload(
  request: Request,
  queryString: QueryParams,
) {
  const { authorization: authToken = '' } = request.headers;
  const storeId = queryString.storeId?.toString();

  return {
    authToken,
    storeId,
  };
}
