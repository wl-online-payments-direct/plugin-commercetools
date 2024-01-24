import { Request, DeleteTokenAppPayload } from '../types';

export function getDeleteTokenRequiredProps(request: Request) {
  const { storeId = '', customerPaymentTokenId = '' } = (request?.body ||
    {}) as DeleteTokenAppPayload;
  return {
    storeId,
    customerPaymentTokenId,
  };
}

export function getDeleteTokenAppPayload(
  request: Request,
): DeleteTokenAppPayload {
  const { storeId = '', customerPaymentTokenId = '' } = (request.body ||
    {}) as DeleteTokenAppPayload;
  const { authorization: authToken = '' } = request.headers;
  return {
    authToken,
    storeId,
    customerPaymentTokenId,
  };
}
