import { hostedCheckoutSession } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getHostedCheckoutAppPayload,
  getHostedCheckoutRequiredProps,
} from './mapper';

export async function hostedCheckoutRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getHostedCheckoutRequiredProps(request));
  return hostedCheckoutSession(getHostedCheckoutAppPayload(request));
}
