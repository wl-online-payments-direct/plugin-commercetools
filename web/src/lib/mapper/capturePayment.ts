import { Request, CapturePaymentPayload } from '../types';

export function getCapturePaymentRequiredProps(request: Request) {
  const {
    storeId = '',
    amount = 0,
    isFinal = false,
    paymentId = '',
  } = (request?.body || {}) as CapturePaymentPayload;

  return {
    storeId,
    amount,
    isFinal,
    paymentId,
  };
}

export function getCapturePaymentAppPayload(request: Request) {
  const authToken = request.headers.authorization || '';

  const {
    storeId = '',
    amount = 0,
    isFinal = false,
    paymentId = '',
  } = (request?.body || {}) as CapturePaymentPayload;

  return {
    authToken,
    storeId,
    amount,
    isFinal,
    paymentId,
  };
}
