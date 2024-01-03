import { getCustomObjects } from '@worldline/ctintegration-ct';
import { capturePaymentService } from '@worldline/ctintegration-psp';
import { ICapturePaymentPayload } from './types';
import { getConnectionServiceProps, getCaptureServicePayload } from './mappers';

export async function capturePayment(payload: ICapturePaymentPayload) {
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);

  const payment = await capturePaymentService(
    getConnectionServiceProps(customConfig),
    getCaptureServicePayload(payload),
    payload.paymentId,
  );
  return payment;
}
