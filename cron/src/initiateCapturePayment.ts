import cron from 'node-cron';
import { CustomObject } from '@commercetools/platform-sdk';
import { getAllCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { getPaymentsByStatus } from '@worldline/ctintegration-db';
import {
  capturePayment,
  calculateTotalCaptureAmount,
} from '@worldline/ctintegration-app';
import { logger } from '@worldline/ctintegration-util';
import dotenv from 'dotenv';
import {
  Status,
  Payment,
  CaptureResponse,
} from './types/initiateCapturePayment';
import {
  getInitiateCaptureServicePayload,
  calculateRemainingOrderAmount,
  calculateTimeDifferenceInHours,
  mapCaptureAuthorizationModeToHours,
} from './mappers/initiateCapturePayment';

// Load environment variables from .env file
dotenv.config();

const cronScheduleTimer = process.env.CRON_SCHEDULE || '* * * * *'; // Default to running every minute if not specified

export default async function initiateCapturePayment() {
  cron.schedule(cronScheduleTimer, async () => {
    try {
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
            const payments = await getPaymentsByStatus(key, [
              Status.INITIAL,
              Status.AUTHORIZED,
            ]);

            // Process payments in parallel using Promise.all
            await Promise.all(
              payments.map(async (payment: Payment) => {
                const order = await getOrderById(payment.orderId);
                const timeDiff = calculateTimeDifferenceInHours(order);
                if (
                  timeDiff > mapCaptureAuthorizationModeToHours(customObject)
                ) {
                  const captureAmount =
                    await calculateTotalCaptureAmount(order);
                  const remainingAmount = calculateRemainingOrderAmount(
                    order,
                    captureAmount,
                  );
                  // Initiate capture for payment
                  const captureResponse: CaptureResponse = await capturePayment(
                    getInitiateCaptureServicePayload(payment, remainingAmount),
                  );
                  logger().debug(
                    'Capture payment response : ',
                    JSON.stringify(capturePayment),
                  );
                  if (captureResponse.status === 'CAPTURE_REQUESTED') {
                    logger().info(
                      'Initiated capture payment request!',
                      JSON.stringify(captureResponse),
                    );
                  }
                }
              }),
            );
          }
        }),
      );
    } catch (error) {
      logger().error(
        '[initiateCapture] : Error in cron job:',
        JSON.stringify(error),
      );
    }
  });
}

initiateCapturePayment();
