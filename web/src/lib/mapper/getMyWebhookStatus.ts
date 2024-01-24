import { Request, QueryParams } from '../types';

export function getMyWebhookStatusAppPayload(
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
