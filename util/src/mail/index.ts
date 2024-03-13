import nodemailer from 'nodemailer';
import { MailInterface, EmailConfig } from '../types';

const sendNotification = async (
  emailConfig: EmailConfig,
  mailOptions: MailInterface,
) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = await nodemailer.createTransport(emailConfig);
  // Return the promise returned by transporter.sendMail(mailOptions)
  const response = await transporter.sendMail(mailOptions);
  return response;
};
export { sendNotification };
