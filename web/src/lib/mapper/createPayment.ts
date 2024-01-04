import { CreatePaymentPayload, Request } from '../types';

export function getCreatePaymentRequiredProps(request: Request) {
  const {
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request?.body || {}) as CreatePaymentPayload;

  return {
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}

export function getCreatePaymentAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';

  const {
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request.body || {}) as CreatePaymentPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}
