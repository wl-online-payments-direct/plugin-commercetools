import { validateMyCart } from '@worldline/ctintegration-app';
import { hasAuthHeaderOrThrowError } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getValidateMyCartAppPayload } from './mapper';

export async function validateMyCartRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  return validateMyCart(getValidateMyCartAppPayload(request));
}
