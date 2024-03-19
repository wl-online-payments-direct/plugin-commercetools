import { ISendEmailPayload, CustomObject } from '../types';
import Constants from '../constants';

export function sendMailOptionsPayment(
  payload: ISendEmailPayload,
  customObject: CustomObject,
) {
  const { pspId, companyName, message, platformVersion, pluginVersion } =
    payload;

  let html = Constants.HTML.EMAIL_TEMPLATE;

  // Replace placeholder strings with actual values from the payload
  html = html.replace('{pspId}', pspId);
  html = html.replace('{companyName}', companyName);
  html = html.replace('{message}', message);
  html = html.replace('{platformVersion}', platformVersion);
  html = html.replace('{pluginVersion}', pluginVersion);

  const { to = '', from = '' } = customObject.value.serverConfig;
  return {
    from,
    to,
    subject: 'Worldline merchant information!',
    text: html,
    html,
  };
}