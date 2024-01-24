import { createMyPayment } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getCreateMyPaymentAppPayload,
  getCreateMyPaymentRequiredProps,
} from './mapper';

export async function createMyPaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getCreateMyPaymentRequiredProps(request));
  return createMyPayment(getCreateMyPaymentAppPayload(request));
}
