import { CreateMyPaymentPayload, Request } from '../types';

export function getCreateMyPaymentRequiredProps(request: Request) {
  const {
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request?.body || {}) as CreateMyPaymentPayload;

  return {
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}

export function getCreateMyPaymentAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';

  const {
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request.body || {}) as CreateMyPaymentPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}
