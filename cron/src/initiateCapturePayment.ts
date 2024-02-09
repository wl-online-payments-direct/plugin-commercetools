import cron from 'node-cron';
import { CustomObject } from '@commercetools/platform-sdk';
import {
  getAllCustomObjects,
  getClientCredentialsToken,
  getOrderById,
} from '@worldline/ctintegration-ct';
import { getPaymentsByStatus } from '@worldline/ctintegration-db';
import { capturePayment } from '@worldline/ctintegration-app';
import { logger } from '@worldline/ctintegration-util';
import dotenv from 'dotenv';
import { Status } from './types/initiateCapturePayment';
import {
  getInitiateCaptureServicePayload,
  calculateTotalCaptureAmount,
  calculateRemainingOrderAmount,
} from './mappers/initiateCapturePayment';

// Load environment variables from .env file
dotenv.config();

// Define your cron schedule (runs every minute in this example)
export default async function initiateCapturePayment() {
  cron.schedule('* * * * *', async () => {
    try {
      // Fetch custom objects from admin config
      const response = await getAllCustomObjects();
      const { results } = response.body.data.customObjects;
      logger().debug('Custom Object Response', JSON.stringify(results));

      // Process custom objects in parallel using Promise.all
      await Promise.all(
        results.map(async (customObject: CustomObject) => {
          // Check if captureAuthorizationMode is other than default
          if (customObject.value.captureAuthorizationMode !== 'DEFAULT') {
            // Get key of custom object
            const { key } = customObject;

            // Fetch payments based on key
            const payments = await getPaymentsByStatus(key, [
              Status.INITIAL,
              Status.AUTHORIZED,
            ]);

            // Process payments in parallel using Promise.all
            await Promise.all(
              payments.map(async (payment) => {
                const order = await getOrderById(payment.orderId);
                const captureAmount = await calculateTotalCaptureAmount(order);
                const remainingAmount = calculateRemainingOrderAmount(
                  order,
                  captureAmount,
                );
                const token = await getClientCredentialsToken();
                // Initiate capture for payment
                const res = await capturePayment(
                  getInitiateCaptureServicePayload(
                    payment,
                    remainingAmount,
                    token,
                  ),
                );
                logger().debug(
                  'Capture payment response : ',
                  JSON.stringify(capturePayment),
                );
                if (res.status === 'CAPTURE_REQUESTED') {
                  logger().info(
                    'Initiated capture payment request!',
                    JSON.stringify(res),
                  );
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
