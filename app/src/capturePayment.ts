import { getCustomObjects } from '@worldline/ctintegration-ct';
import { capturePaymentService } from '@worldline/ctintegration-psp';
import { ICapturePaymentPayload } from './types';
import { getConnectionServiceProps, getCaptureServicePayload } from './mappers';

export async function capturePayment(payload: ICapturePaymentPayload) {
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);
  if (!customConfig) {
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
