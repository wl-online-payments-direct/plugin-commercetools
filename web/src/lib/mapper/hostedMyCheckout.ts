import { HostedMyCheckoutPayload, Request } from '../types';

export function getHostedMyCheckoutRequiredProps(request: Request) {
  const { storeId = '', returnUrl = '' } = (request?.body ||
    {}) as HostedMyCheckoutPayload;
  return {
    storeId,
    returnUrl,
  };
}

export function getHostedMyCheckoutAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';
  const {
    storeId = '',
    tokens = '',
    returnUrl = '',
  } = (request?.body || {}) as HostedMyCheckoutPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    returnUrl,
    tokens,
  };
}
