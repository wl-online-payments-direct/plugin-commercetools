import { Request, QueryParams } from '../types';

export function getWebhookStatusAppPayload(
  request: Request,
  queryString: QueryParams,
) {
  const { authorization: authToken = '' } = request.headers;
  const paymentId = queryString.paymentId?.toString();
  return {
    authToken,
    paymentId,
  };
}
