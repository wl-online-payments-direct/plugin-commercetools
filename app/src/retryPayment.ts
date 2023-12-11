import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentStatusService } from '@worldline/ctintegration-psp';
import { RetryPaymentStatusPayload } from './types';
import { getConnectionServiceProps } from './mappers';
import { orderPaymentHandler } from './webhook';

export async function retryPayment(payload: RetryPaymentStatusPayload) {
  // Get psp details
  const payment = await getPaymentStatusService(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    payload.paymentId,
  );

  return orderPaymentHandler(payment);
}
