import { InitiatePaymentPayload, Request } from '../types';

export function getInitSessionRequiredProps(request: Request) {
  const { storeId = '' } = (request?.body || {}) as InitiatePaymentPayload;
  return {
    storeId,
  };
}

export function getInitSessionAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  const {
    storeId = '',
    tokens = '',
    askConsumerConsent = true,
  } = (request?.body || {}) as InitiatePaymentPayload;

  return {
    authToken,
    storeId,
    tokens,
    askConsumerConsent,
  };
}
