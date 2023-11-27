import { getCustomObjects } from '@worldline/ct-integration';
import { getPaymentStatusService } from '@worldline/psp-integration';
import { GetPaymentStatusPayload } from './types';
import { getConnectionServiceProps } from './mappers';

export async function getPaymentStatus(payload: GetPaymentStatusPayload) {
  const { authToken, storeId, paymentId } = payload;
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(authToken, storeId);

  // Prepare service payload for get payment status
  const paymentServiceResponse = await getPaymentStatusService(
    getConnectionServiceProps(customConfig),
    paymentId,
  );

  // Response only have status
  return paymentServiceResponse;
}
