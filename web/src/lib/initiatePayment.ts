import { initiatePaymentSession } from '@worldline/app-integration';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import { getInitSessionAppPayload } from './mapper';

export async function initiatePaymentRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(request, ['storeId', 'cartId']);
  return initiatePaymentSession(getInitSessionAppPayload(request));
}
