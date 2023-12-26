import { Request, DeleteTokenAppPayload } from '../types';
import { pick } from './common';

export function getDeleteTokenRequiredProps(request: Request) {
  return pick(request.body, ['storeId', 'token']);
}

export function getDeleteTokenAppPayload(
  request: Request,
): DeleteTokenAppPayload {
  const { storeId, token } = request.body || {};
  return {
    storeId,
    token,
  };
}
