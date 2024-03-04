import fs from 'fs';
import path from 'path';
import { ISendEmailPayload, CustomObject } from '../types';

export function sendMailOptionsPayment(
  payload: ISendEmailPayload,
  customObject: CustomObject,
) {
  const { pspId, companyName, message, platformVersion, pluginVersion } =
    payload;
  // Get the absolute path to the HTML file
  const htmlFilePath = path.join(
    __dirname,
    '../../src/constants/emailTemplate.html',
  );
  // Read the content of the HTML file
  let html = fs.readFileSync(htmlFilePath, 'utf8');

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
