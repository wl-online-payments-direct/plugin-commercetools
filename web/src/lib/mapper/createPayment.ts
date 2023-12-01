import { Request } from '../types';
import { pick } from './common';

export function getCreatePaymentRequiredProps(request: Request) {
  return pick(request.body, ['storeId', 'hostedTokenizationId', 'returnUrl']);
}

export function getCreatePaymentAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  const { storeId, hostedTokenizationId, returnUrl } = request.body;
  return {
    authToken,
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}
