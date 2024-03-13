import { Payment, CustomObject } from '../types';
import Constants from '../constants';

export function createMailOptionsPayment(
  dbPayments: Payment[],
  customObject: CustomObject,
) {
  let tableBody = '';
  dbPayments.forEach((dbPayment) => {
    const { paymentId, worldlineId, status } = dbPayment;
    tableBody += `
      <tr>
        <td>${paymentId}</td>
        <td>${worldlineId}</td>
        <td>${status}</td>
      </tr>
    `;
  });

  let htmlTemplate = Constants.HTML.PAYMENT_TEMPLATE;

  // Replace the placeholder with the dynamically generated table body
  htmlTemplate = htmlTemplate.replace('{tableBody}', tableBody);

  const { to, from } = customObject.value.serverConfig;
  return {
    from,
    to,
    subject: 'Worldline payments for review!',
    text: htmlTemplate,
    html: htmlTemplate,
  };
}

export function createEmailConfig(customObject: CustomObject) {
  const { url, port, username, password } = customObject.value.serverConfig;
  return {
    host: url,
    port: parseInt(port, 10),
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  };
}
