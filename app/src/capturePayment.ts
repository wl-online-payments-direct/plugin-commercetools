import { getCustomObjects } from '@worldline/ctintegration-ct';
import { capturePaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICapturePaymentPayload } from './types';
import { getConnectionServiceProps, getCaptureServicePayload } from './mappers';

export async function capturePayment(payload: ICapturePaymentPayload) {
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);
  if (!customConfig) {
    logger().error('Failed to fetch configuration from CT custom object');
    throw {
      message: 'Failed to fetch configuration',
      statusCode: 500,
    };
  }

  const payment = await capturePaymentService(
    getConnectionServiceProps(customConfig),
    getCaptureServicePayload(payload),
    payload.paymentId,
  );
  return payment;
}
