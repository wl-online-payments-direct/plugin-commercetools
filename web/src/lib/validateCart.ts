import { validateCart } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getValidateCartRequiredProps,
  getValidateCartAppPayload,
} from './mapper';

export async function validateCartRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getValidateCartRequiredProps(request));
  return validateCart(getValidateCartAppPayload(request));
}
