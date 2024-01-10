import { HostedCheckoutPayload, Request } from '../types';

export function getHostedCheckoutRequiredProps(request: Request) {
  const { storeId = '' } = (request?.body || {}) as HostedCheckoutPayload;
  return {
    storeId,
  };
}

export function getHostedCheckoutAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  const { storeId = '', tokens = '' } = (request?.body ||
    {}) as HostedCheckoutPayload;

  return {
    authToken,
    storeId,
    tokens,
  };
}
