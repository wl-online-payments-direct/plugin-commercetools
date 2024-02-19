import { refundPayment } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getRefundPaymentAppPayload,
  getRefundPaymentRequiredProps,
} from './mapper';

export async function refundPaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getRefundPaymentRequiredProps(request));
  return refundPayment(getRefundPaymentAppPayload(request));
}
