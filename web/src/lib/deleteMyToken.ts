import { deleteTokenAppHandler } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getDeleteMyTokenAppPayload,
  getDeleteMyTokenRequiredProps,
} from './mapper';

export async function deleteMyToken(request: Request) {
  hasRequiredParamsInBody(getDeleteMyTokenRequiredProps(request));
  return deleteTokenAppHandler(getDeleteMyTokenAppPayload(request));
}
