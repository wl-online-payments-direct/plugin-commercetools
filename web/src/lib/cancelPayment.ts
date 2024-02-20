import { cancelPayment } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getCancelPaymentAppPayload,
  getCancelPaymentRequiredProps,
} from './mapper';

export async function cancelPaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getCancelPaymentRequiredProps(request));
  return cancelPayment(getCancelPaymentAppPayload(request));
}
