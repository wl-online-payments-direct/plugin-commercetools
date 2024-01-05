import { QueryParams, Request } from '../types';
import { pick } from './common';

export function getPaymentMethodsRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['storeId']);
}

export function getPaymentMethodsAppPayload(
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
