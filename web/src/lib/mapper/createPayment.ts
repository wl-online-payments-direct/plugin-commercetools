import { Request } from '../types';

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
