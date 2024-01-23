import { myHostedTokenizationSession } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getMyHostedTokenizationAppPayload,
  getMyHostedTokenizationRequiredProps,
} from './mapper';

export async function myHostedTokenizationRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getMyHostedTokenizationRequiredProps(request));
  return myHostedTokenizationSession(
    getMyHostedTokenizationAppPayload(request),
  );
}
