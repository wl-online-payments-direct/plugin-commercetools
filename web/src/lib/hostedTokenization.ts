import { hostedTokenizationSession } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getInitSessionAppPayload,
  getInitSessionRequiredProps,
} from './mapper';

export async function hostedTokenizationRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getInitSessionRequiredProps(request));
  return hostedTokenizationSession(getInitSessionAppPayload(request));
}
