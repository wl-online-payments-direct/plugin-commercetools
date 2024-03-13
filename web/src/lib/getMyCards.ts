import { getMyCardsAppHandler } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getMyCardsAppPayload,
  getMyCardsRequiredProps,
  getQuery,
} from './mapper';

export async function getMyCards(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getMyCardsRequiredProps(queryString));
  return getMyCardsAppHandler(getMyCardsAppPayload(request, queryString));
}
