import { Request, RetryPaymentAppPayload } from '../types';

export function getRetryPaymentAppPayload(
  request: Request,
): RetryPaymentAppPayload {
  const { paymentId, storeId } = request.body;
  return {
    paymentId,
    storeId,
  };
}
