import { Request, CapturePaymentPayload } from '../types';

export function getCapturePaymentRequiredProps(request: Request) {
  const {
    storeId = '',
    amount = 0,
    isFinal,
    paymentId = '',
    orderId = '',
  } = (request?.body || {}) as CapturePaymentPayload;

  return {
    storeId,
    amount,
    isFinal,
    paymentId,
    orderId,
  };
}

export function getCapturePaymentAppPayload(request: Request) {
  const authToken = request.headers.authorization || '';

  const {
    storeId = '',
    amount = 0,
    isFinal,
    paymentId = '',
    orderId = '',
  } = (request?.body || {}) as CapturePaymentPayload;

  return {
    authToken,
    storeId,
    amount,
    isFinal,
    paymentId,
    orderId,
  };
}
