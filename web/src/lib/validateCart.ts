import { validateCart } from '@worldline/ctintegration-app';
import { hasAuthHeaderOrThrowError } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getValidateCartAppPayload } from './mapper';

export async function validateCartRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  return validateCart(getValidateCartAppPayload(request));
}
