import { Request } from '../types';
import { pick } from './common';

export function getCreatePaymentRequiredProps(request: Request) {
  return pick(request.body, ['storeId', 'hostedTokenizationId', 'returnUrl']);
}

export function getCreatePaymentAppPayload(request: Request) {
  const { authorization: authToken = '', accept: acceptHeader = '' } =
    request.headers;
  const userAgent = request.headers['user-agent'] || '';
  const { storeId, hostedTokenizationId, returnUrl } = request.body;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}
