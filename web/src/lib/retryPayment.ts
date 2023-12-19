import { retryPaymentAppHandler } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getRetryPaymentAppPayload,
  getRetryPaymentRequiredProps,
} from './mapper';

export async function retryPayment(request: Request) {
  hasRequiredParamsInBody(getRetryPaymentRequiredProps(request));
  return retryPaymentAppHandler(getRetryPaymentAppPayload(request));
}
