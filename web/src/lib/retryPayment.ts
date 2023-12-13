import { retryPaymentAppHandler } from '@worldline/ctintegration-app';
import { Request } from './types';
import { getRetryPaymentAppPayload } from './mapper';

export async function retryPayment(request: Request) {
  return retryPaymentAppHandler(getRetryPaymentAppPayload(request));
}
