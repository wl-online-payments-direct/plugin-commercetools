import { CustomObject } from '@worldline/ctintegration-ct';
import { ISendEmailPayload } from '../types';

export function sendMailOptionsPayment(
  payload: ISendEmailPayload,
  customObject: CustomObject,
) {
  const { pspId, companyName, message, platformVersion, pluginVersion } =
    payload;
  const html = `<table border=1>
    <thead>
      <tr>
        <th>PSP Id</th>
        <th>Company Name</th>
        <th>Message</th>
        <th>Platform Version </th>
        <th>Plugin Version </th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td> ${pspId}</td>
      <td> ${companyName}</td>
      <td> ${message}</td>
      <td> ${platformVersion}</td>
      <td> ${pluginVersion}</td>
      </tr>
    </tbody>
  </table>`;
  const { to, from } = customObject.value.serverConfig;
  return {
    from,
    to,
    subject: 'Worldline merchant informatiom!',
    text: html,
    html,
  };
}
