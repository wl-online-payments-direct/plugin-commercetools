import { Request } from '../types';
import { pick } from './common';

export function getInitSessionRequiredProps(request: Request) {
  return pick(request.body, ['storeId']);
}

export function getInitSessionAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  const { storeId, cartId, tokens, askConsumerConsent = true } = request.body;
  return {
    authToken,
    storeId,
    cartId,
    tokens,
    askConsumerConsent,
  };
}
