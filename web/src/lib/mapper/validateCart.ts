import { Request } from '../types';

export function getValidateCartAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  return {
    authToken,
  };
}
