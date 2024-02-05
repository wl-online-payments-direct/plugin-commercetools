import { QueryParams, Request } from '../types';
import { pick } from './common';

export function getPaymentMethodsRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['storeId', 'cartId']);
}

export function getPaymentMethodsAppPayload(
  request: Request,
  queryString: QueryParams,
) {
  const { authorization: authToken = '' } = request.headers;
  const storeId = queryString.storeId?.toString();
  const cartId = queryString.cartId?.toString();

  return {
    authToken,
    storeId,
    cartId,
  };
}
