import { Request, CancelPaymentPayload } from '../types';

export function getCancelPaymentRequiredProps(request: Request) {
  const {
    orderId = '',
    storeId = '',
    amount = 0,
    isFinal = false,
    currencyCode = '',
    paymentId = '',
  } = (request?.body || {}) as CancelPaymentPayload;

  return {
    orderId,
    storeId,
    amount,
    isFinal,
    currencyCode,
    paymentId,
  };
}

export function getCancelPaymentAppPayload(request: Request) {
  const authToken = request.headers.authorization || '';

  const {
    orderId = '',
    storeId = '',
    amount = 0,
    isFinal = false,
    currencyCode = '',
    paymentId = '',
  } = (request?.body || {}) as CancelPaymentPayload;

  return {
    authToken,
    orderId,
    storeId,
    amount,
    isFinal,
    currencyCode,
    paymentId,
  };
}
