import { Request } from '../types';

export function getPaymentMethodsAppPayload(request: Request) {
  const { authorization: authToken = '' } = request.headers;
  return {
    authToken,
  };
}
