import { deleteTokenAppHandler } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getDeleteTokenAppPayload,
  getDeleteTokenRequiredProps,
} from './mapper';

export async function deleteToken(request: Request) {
  hasRequiredParamsInBody(getDeleteTokenRequiredProps(request));
  return deleteTokenAppHandler(getDeleteTokenAppPayload(request));
}
