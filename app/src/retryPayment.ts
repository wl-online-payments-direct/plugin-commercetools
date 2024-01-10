import { getMyCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { getPayment } from '@worldline/ctintegration-db';
import { logger } from '@worldline/ctintegration-util';
import { RetryPaymentStatusPayload } from './types';
import {
  getConnectionServiceProps,
  retryPaymentStatusPayload,
} from './mappers';
import { orderPaymentHandler } from './common';

export async function retryPaymentAppHandler(
  payload: RetryPaymentStatusPayload,
) {
  const customConfig = await getMyCustomObjects(
    payload.authToken,
    payload.storeId,
  );

  if (!customConfig) {
    throw {
      message: 'Failed to fetch configuration',
      statusCode: 500,
    };
  }

  logger().debug('[RetryPayment] Received custom objects using me client');

  const dbPayment = await getPayment(retryPaymentStatusPayload(payload));
  if (!dbPayment) {
    throw {
      message: `Failed to fetch the payment for id : '${payload.id}'`,
      statusCode: 500,
    };
  }

  logger().debug('[RetryPayment] Received payment from database');

  // Get psp details
  const payment = await getPaymentStatusService(
    getConnectionServiceProps(customConfig),
    dbPayment.worldlineId,
  );

  logger().debug('[RetryPayment] Received payment from psp');

  return orderPaymentHandler({ payment });
}
