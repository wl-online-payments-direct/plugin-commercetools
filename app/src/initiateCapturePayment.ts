import { logger } from '@worldline/ctintegration-util';
import { getAllCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { getPaymentsByStatus } from '@worldline/ctintegration-db';
import { Status, Payment, CaptureResponse, CustomObject } from './types';
import {
  calculateTimeDifferenceInHours,
  mapCaptureAuthorizationModeToHours,
  getInitiateCaptureServicePayload,
  calculateRemainingOrderAmount,
} from './mappers';
import { calculateTotalCaptureAmount, capturePayment } from './capturePayment';

export async function initiateCapturePaymentApp() {
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
            if (timeDiff > mapCaptureAuthorizationModeToHours(customObject)) {
              const captureAmount = await calculateTotalCaptureAmount(order);
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
}
