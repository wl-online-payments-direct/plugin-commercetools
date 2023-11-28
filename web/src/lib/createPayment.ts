import { createPayment } from '@worldline/app-integration';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import { getCreatePaymentAppPayload } from './mapper';

export async function createPaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(request, [
    'storeId',
    'hostedTokenizationId',
    'returnUrl',
  ]);
  return createPayment(getCreatePaymentAppPayload(request));
}
