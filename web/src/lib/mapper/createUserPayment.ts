import { CreateUserPaymentPayload, Request } from '../types';

export function getCreateUserPaymentRequiredProps(request: Request) {
  const {
    cartId = '',
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request?.body || {}) as CreateUserPaymentPayload;

  return {
    cartId,
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}

export function getCreateUserPaymentAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';

  const {
    cartId = '',
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request.body || {}) as CreateUserPaymentPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    cartId,
    hostedTokenizationId,
    returnUrl,
  };
}
