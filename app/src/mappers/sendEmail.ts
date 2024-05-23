import { ISendEmailPayload, CustomObject } from '../types';
import Constants from '../constants';

export function sendMailOptionsPayment(
  payload: ISendEmailPayload,
  customObject: CustomObject,
) {
  const { pspId, companyName, message, pluginVersion } = payload;

  let html = Constants.HTML.EMAIL_TEMPLATE;

  // Replace placeholder strings with actual values from the payload
  html = html.replace('{pspId}', pspId);
  html = html.replace('{companyName}', companyName);
  html = html.replace('{message}', message);
  html = html.replace('{pluginVersion}', pluginVersion);

  const { from = '' } = customObject.value.serverConfig;
  return {
    // For "Request new Feature" - the mails will reach to the Wordline
    to: Constants.getWorldlineEmailID(),
    from,
    subject: 'Worldline merchant information!',
    text: html,
    html,
  };
}
