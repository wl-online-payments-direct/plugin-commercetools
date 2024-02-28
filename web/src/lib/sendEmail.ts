import { sendEmail } from '@worldline/ctintegration-app';
import {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
} from '@worldline/ctintegration-util';
import { Request } from './types';
import { getSendEmailAppPayload, getSendEmailRequiredProps } from './mapper';

export async function sendEmailRequest(request: Request) {
  hasAuthHeaderOrThrowError(request);
  hasRequiredParamsInBody(getSendEmailRequiredProps(request));
  return sendEmail(getSendEmailAppPayload(request));
}
