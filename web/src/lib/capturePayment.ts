import { capturePayment } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getCapturePaymentAppPayload,
  getCapturePaymentRequiredProps,
} from './mapper';

export async function capturePaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getCapturePaymentRequiredProps(request));
  return capturePayment(getCapturePaymentAppPayload(request));
}
