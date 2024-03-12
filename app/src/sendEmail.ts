import { logger, sendNotification } from '@worldline/ctintegration-util';
import { getCustomObject } from '@worldline/ctintegration-ct';
import { ISendEmailPayload } from './types';
import { createEmailConfig, sendMailOptionsPayment } from './mappers';

export async function sendEmail(payload: ISendEmailPayload) {
  // Fetch custom objects from admin config
  const customObject = await getCustomObject(payload.storeId);

  if (!customObject) {
    logger().error('Failed to CT custom object');
    throw {
      message: 'Failed to CT custom object',
      statusCode: 500,
    };
  }
  const response = sendNotification(
    createEmailConfig(customObject),
    sendMailOptionsPayment(payload, customObject),
  );
  return response;
}
