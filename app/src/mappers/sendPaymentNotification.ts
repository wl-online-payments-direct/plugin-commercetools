import { CustomObject } from '@worldline/ctintegration-ct';
import { Payment } from '../types';

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
  const html = `<table border=1>
    <thead>
      <tr>
        <th>Payment Id</th>
        <th>WorldLine Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${tableBody}
    </tbody>
  </table>`;
  const { to, from } = customObject.value.serverConfig;
  return {
    from,
    to,
    subject: 'Worldline payments for review!',
    text: html,
    html,
  };
}

export function createEmailConfig(customObject: CustomObject) {
  const { url, port, username, password } = customObject.value.serverConfig;
  return {
    host: url,
    port,
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  };
}
