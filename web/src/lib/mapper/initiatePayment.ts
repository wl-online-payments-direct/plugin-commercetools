import { InitiatePaymentPayload, Request } from '../types';

export function getInitSessionRequiredProps(request: Request) {
  const { storeId = '', cartId = '' } = (request?.body ||
    {}) as InitiatePaymentPayload;
  return {
    storeId,
    cartId,
  };
}

export function getInitSessionAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  const {
    storeId = '',
    cartId = '',
    tokens = '',
    askConsumerConsent = true,
  } = (request?.body || {}) as InitiatePaymentPayload;

  return {
    authToken,
    storeId,
    cartId,
    tokens,
    askConsumerConsent,
  };
}
