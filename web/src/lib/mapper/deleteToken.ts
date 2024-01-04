import { Request, DeleteTokenAppPayload } from '../types';

export function getDeleteTokenRequiredProps(request: Request) {
  const { storeId = '', token = '' } = (request?.body ||
    {}) as DeleteTokenAppPayload;
  return {
    storeId,
    token,
  };
}

export function getDeleteTokenAppPayload(
  request: Request,
): DeleteTokenAppPayload {
  const { storeId = '', token = '' } = (request.body ||
    {}) as DeleteTokenAppPayload;
  return {
    storeId,
    token,
  };
}
