import { Request, RetryPaymentAppPayload } from '../types';

export function getRetryPaymentRequiredProps(request: Request) {
  const { id = '', storeId = '' } = (request?.body ||
    {}) as RetryPaymentAppPayload;
  return {
    id,
    storeId,
  };
}

export function getRetryPaymentAppPayload(
  request: Request,
): RetryPaymentAppPayload {
  const { id = '', storeId = '' } = (request?.body ||
    {}) as RetryPaymentAppPayload;
  const { authorization: authToken = '' } = request.headers;
  return {
    id,
    storeId,
    authToken,
  };
}
