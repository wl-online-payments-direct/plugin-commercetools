import { Request } from '../types';

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
