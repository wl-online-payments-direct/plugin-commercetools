import { Request, QueryParams } from '../types';
import { pick } from './common';

export function getMyWebhookStatusRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['paymentId']);
}

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
