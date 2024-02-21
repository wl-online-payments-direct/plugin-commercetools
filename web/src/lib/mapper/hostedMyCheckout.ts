import { HostedMyCheckoutPayload, Request } from '../types';

export function getHostedMyCheckoutRequiredProps(request: Request) {
  const {
    storeId = '',
    returnUrl = '',
    hostedTokenizationId = '',
  } = (request?.body || {}) as HostedMyCheckoutPayload;
  return {
    storeId,
    returnUrl,
    hostedTokenizationId,
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
    hostedTokenizationId = '',
  } = (request?.body || {}) as HostedMyCheckoutPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    hostedTokenizationId,
    returnUrl,
    tokens,
  };
}
