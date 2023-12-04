import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { GetPaymentStatusPayload } from './types';
import { getConnectionServiceProps } from './mappers';
import { getPaymentStatusPayload } from './mappers/getPaymentStatus';

export async function getPaymentStatus(payload: GetPaymentStatusPayload) {
  // Prepare service payload for get payment status
  const paymentServiceResponse = await getPaymentStatusService(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    getPaymentStatusPayload(payload),
  );
  // Response only have status
  return paymentServiceResponse;
}
