import { createUserPayment } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getCreateUserPaymentAppPayload,
  getCreateUserPaymentRequiredProps,
} from './mapper';

export async function createUserPaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getCreateUserPaymentRequiredProps(request));
  return createUserPayment(getCreateUserPaymentAppPayload(request));
}
