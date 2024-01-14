import { RefundPaymentPayload, Request } from '../types';

export function getRefundPaymentRequiredProps(request: Request) {
  const {
    orderId = '',
    storeId = '',
    amount = 0,
    currencyCode = '',
    paymentId = '',
  } = (request?.body || {}) as RefundPaymentPayload;

  return {
    orderId,
    storeId,
    amount,
    currencyCode,
    paymentId,
  };
}

export function getRefundPaymentAppPayload(request: Request) {
  const authToken = request.headers.authorization || '';

  const {
    orderId = '',
    storeId = '',
    amount = 0,
    currencyCode = '',
    paymentId = '',
  } = (request.body || {}) as RefundPaymentPayload;

  return {
    orderId,
    storeId,
    authToken,
    amount,
    currencyCode,
    paymentId,
  };
}
