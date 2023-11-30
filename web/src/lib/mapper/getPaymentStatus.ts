import { QueryParams, Request } from '../types';

import { pick } from './common';

export function getPaymentStatusRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['paymentId', 'storeId']);
}

export function getPaymentStatusAppPayload(
  request: Request,
  queryString: QueryParams,
) {
  const { authorization: authToken = '' } = request.headers;
  const storeId = queryString.storeId?.toString();
  const paymentId = queryString.paymentId?.toString();
  return {
    authToken,
    storeId,
    paymentId,
  };
}
