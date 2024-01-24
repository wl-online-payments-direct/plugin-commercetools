import { HostedCheckoutPayload, Request } from '../types';

export function getHostedCheckoutRequiredProps(request: Request) {
  const {
    storeId = '',
    cartId = '',
    returnUrl = '',
  } = (request?.body || {}) as HostedCheckoutPayload;
  return {
    storeId,
    cartId,
    returnUrl,
  };
}

export function getHostedCheckoutAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';
  const {
    storeId = '',
    cartId = '',
    tokens = '',
    returnUrl = '',
  } = (request?.body || {}) as HostedCheckoutPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    cartId,
    returnUrl,
    tokens,
  };
}
