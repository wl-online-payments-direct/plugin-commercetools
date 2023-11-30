import { createPayment } from '@worldline/app-integration';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getCreatePaymentAppPayload,
  getCreatePaymentRequiredProps,
} from './mapper';

export async function createPaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getCreatePaymentRequiredProps(request));
  return createPayment(getCreatePaymentAppPayload(request));
}
