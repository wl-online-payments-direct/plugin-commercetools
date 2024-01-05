import { initiatePaymentSession } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getInitSessionAppPayload,
  getInitSessionRequiredProps,
} from './mapper';

export async function initiatePaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getInitSessionRequiredProps(request));
  return initiatePaymentSession(getInitSessionAppPayload(request));
}
