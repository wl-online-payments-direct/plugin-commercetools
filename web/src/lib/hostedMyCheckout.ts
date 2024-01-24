import { hostedMyCheckoutSession } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getHostedMyCheckoutAppPayload,
  getHostedMyCheckoutRequiredProps,
} from './mapper';

export async function hostedMyCheckoutRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getHostedMyCheckoutRequiredProps(request));
  return hostedMyCheckoutSession(getHostedMyCheckoutAppPayload(request));
}
