import { getCardsAppHandler } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInQueryString,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import { getCardsAppPayload, getCardsRequiredProps, getQuery } from './mapper';

export async function getCards(request: Request) {
  hasAuthHeaderOrThrowError(request);
  const queryString = getQuery(request);
  hasRequiredParamsInQueryString(getCardsRequiredProps(queryString));
  return getCardsAppHandler(getCardsAppPayload(queryString));
}
