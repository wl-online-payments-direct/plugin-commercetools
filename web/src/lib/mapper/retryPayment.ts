import { Request, RetryPaymentAppPayload } from '../types';

import { pick } from './common';

export function getRetryPaymentRequiredProps(request: Request) {
  return pick(request.body, ['id', 'storeId']);
}

export function getRetryPaymentAppPayload(
  request: Request,
): RetryPaymentAppPayload {
  const { id, storeId } = request.body;
  return {
    id,
    storeId,
  };
}
