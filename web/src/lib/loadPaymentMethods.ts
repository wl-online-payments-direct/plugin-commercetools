import { loadPaymentMethodsAppHandler } from '@worldline/ctintegration-app';
import { hasAuthHeaderOrThrowError } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getPaymentMethodsAppPayload } from './mapper';

export async function loadPaymentMethods(request: Request) {
  hasAuthHeaderOrThrowError(request);
  return loadPaymentMethodsAppHandler(getPaymentMethodsAppPayload(request));
}
