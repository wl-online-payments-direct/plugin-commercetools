import { QueryParams } from '../types';

import { pick } from './common';

export function getOrderRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['paymentId']);
}

export function getOrderAppPayload(queryString: QueryParams) {
  const paymentId = queryString.paymentId?.toString();
  return {
    paymentId,
  };
}
