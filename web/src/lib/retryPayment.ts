import { retryPaymentAppHandler } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody, logger } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getRetryPaymentAppPayload,
  getRetryPaymentRequiredProps,
} from './mapper';

export async function retryPayment(request: Request) {
  logger().debug('[RetryPayment] Validation started');
  hasRequiredParamsInBody(getRetryPaymentRequiredProps(request));
  logger().debug('[RetryPayment] Validation succeded');

  logger().debug('[RetryPayment] App process started');
  return retryPaymentAppHandler(getRetryPaymentAppPayload(request));
}
