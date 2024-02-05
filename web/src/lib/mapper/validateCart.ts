import { Request, ValidateCartPayload } from '../types';

export function getValidateMyCartAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  return {
    authToken,
  };
}

export function getValidateCartRequiredProps(request: Request) {
  const { cartId = '' } = (request?.body || {}) as ValidateCartPayload;

  return {
    cartId,
  };
}

export function getValidateCartAppPayload(request: Request) {
  const { cartId = '' } = (request?.body || {}) as ValidateCartPayload;

  const { authorization: authToken = '' } = request.headers;

  return {
    cartId,
    authToken,
  };
}
