import { Request } from '../types';

export function getPaymentStatusAppPayload(
  request: Request,
  queryString: {
    [key: string]: string | string[];
  },
) {
  const { authorization: authToken = '' } = request.headers;
  const storeId = queryString.storeId?.toString();
  const paymentId = queryString.paymentId?.toString();
  return {
    authToken,
    storeId,
    paymentId,
  };
}
