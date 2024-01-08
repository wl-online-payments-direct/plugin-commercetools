import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { getPayment } from '@worldline/ctintegration-db';
import { RetryPaymentStatusPayload } from './types';
import {
  getConnectionServiceProps,
  retryPaymentStatusPayload,
} from './mappers';
import { orderPaymentHandler } from './common';

export async function retryPaymentAppHandler(
  payload: RetryPaymentStatusPayload,
) {
  const customConfig = await getCustomObjects(payload.storeId, false);
  if (!customConfig) {
    throw {
      message: 'Failed to fetch configuration',
      statusCode: 500,
    };
  }

  const dbPayment = await getPayment(retryPaymentStatusPayload(payload));
  if (!dbPayment) {
    throw {
      message: `Failed to fetch the payment for id : '${payload.id}'`,
      statusCode: 500,
    };
  }
  // Get psp details
  const payment = await getPaymentStatusService(
    getConnectionServiceProps(customConfig),
    dbPayment.worldlineId,
  );
  return orderPaymentHandler({ payment });
}
