import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { getPayment } from '@worldline/ctintegration-db';
import { RetryPaymentStatusPayload } from './types';
import {
  getConnectionServiceProps,
  retryPaymentStatusPayload,
} from './mappers';
import { orderPaymentHandler } from './lib';

export async function retryPaymentAppHandler(
  payload: RetryPaymentStatusPayload,
) {
  const dbPayment = await getPayment(retryPaymentStatusPayload(payload));
  if (!dbPayment) {
    throw {
      message: `Failed to fetch the payment for id : '${payload.id}'`,
      statusCode: 500,
    };
  }
  // Get psp details
  const payment = await getPaymentStatusService(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    dbPayment.worldlineId,
  );
  return orderPaymentHandler({ payment });
}
