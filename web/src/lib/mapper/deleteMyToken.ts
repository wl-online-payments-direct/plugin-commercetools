import { Request, DeleteMyTokenAppPayload } from '../types';

export function getDeleteMyTokenRequiredProps(request: Request) {
  const { storeId = '', customerPaymentTokenId = '' } = (request?.body ||
    {}) as DeleteMyTokenAppPayload;
  return {
    storeId,
    customerPaymentTokenId,
  };
}

export function getDeleteMyTokenAppPayload(
  request: Request,
): DeleteMyTokenAppPayload {
  const { storeId = '', customerPaymentTokenId = '' } = (request.body ||
    {}) as DeleteMyTokenAppPayload;
  const { authorization: authToken = '' } = request.headers;
  return {
    authToken,
    storeId,
    customerPaymentTokenId,
  };
}
