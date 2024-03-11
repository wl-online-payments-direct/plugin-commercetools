import { sendEmail } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody } from '@worldline/ctintegration-util';
import { Request } from './types';
import { getSendEmailAppPayload, getSendEmailRequiredProps } from './mapper';

export async function sendEmailRequest(request: Request) {
  hasRequiredParamsInBody(getSendEmailRequiredProps(request));
  return sendEmail(getSendEmailAppPayload(request));
}
