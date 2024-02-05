import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { getPayment } from '@worldline/ctintegration-db';
import { GetPaymentStatusPayload } from './types';
import {
  getConnectionServiceProps,
  getPaymentStatusDBPayload,
  getPaymentStatusResponseMapper,
} from './mappers';

export async function getPaymentStatus(payload: GetPaymentStatusPayload) {
  const payment = await getPayment(getPaymentStatusDBPayload(payload));
  if (!payment) {
    throw {
      message: `Failed to fetch the payment for id : '${payload.id}'`,
      statusCode: 500,
    };
  }
  // Prepare service payload for get payment status
  const serviceResponse = await getPaymentStatusService(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    payment.worldlineId,
  );

  return getPaymentStatusResponseMapper(serviceResponse, payment);
}
