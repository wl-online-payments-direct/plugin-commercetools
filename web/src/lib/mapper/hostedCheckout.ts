import { HostedCheckoutPayload, Request } from '../types';

export function getHostedCheckoutRequiredProps(request: Request) {
  const { storeId = '', returnUrl = '' } = (request?.body ||
    {}) as HostedCheckoutPayload;
  return {
    storeId,
    returnUrl,
  };
}

export function getHostedCheckoutAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';
  const {
    storeId = '',
    tokens = '',
    returnUrl = '',
  } = (request?.body || {}) as HostedCheckoutPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    returnUrl,
    tokens,
  };
}
