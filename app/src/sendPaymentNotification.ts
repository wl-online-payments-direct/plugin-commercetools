import { getAllCustomObjects, CustomObject } from '@worldline/ctintegration-ct';
import { getPaymentsByStatus, setPayment } from '@worldline/ctintegration-db';
import { logger, sendNotification } from '@worldline/ctintegration-util';
import { Payment, Status, SendNotificationResponse } from './types';
import { createMailOptionsPayment, createEmailConfig } from './mappers';

export async function sendNotificationForReviewPaymentsApp() {
  // Fetch custom objects from admin config
  const response = await getAllCustomObjects();
  const { results } = response.body.data.customObjects;
  logger().debug('Custom Object Response', JSON.stringify(results));
  // Process custom objects in parallel using Promise.all
  await Promise.all(
    results.map(async (customObject: CustomObject) => {
      // Check if captureAuthorizationMode is other than default
      if (
        customObject.value.captureAuthorizationMode !==
        process.env.CAPTURE_AUTH_MODE
      ) {
        // Get key of custom object
        const { key } = customObject;
        // Fetch payments based on key
        const payments = await getPaymentsByStatus(
          key,
          [Status.IN_REVIEW],
          false,
        );
        if (payments.length > 0) {
          // Send notification for each store
          const isSendNotification = (await sendNotification(
            createEmailConfig(customObject),
            createMailOptionsPayment(payments, customObject),
          )) as SendNotificationResponse;

          // Process payments in parallel using Promise.all
          await Promise.all(
            payments.map(async (payment: Payment) => {
              if (isSendNotification.messageId && !payment.isSendNotification) {
                await setPayment(
                  { id: payment.id },
                  { isSendNotification: true },
                );
              }
            }),
          );
        }
      }
    }),
  );
}
