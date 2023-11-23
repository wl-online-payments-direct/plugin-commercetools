import { getCustomObjects } from '@worldline/ct-integration';
import { getPaymentStatusService } from '@worldline/psp-integration';
import { GetPaymentStatusPayload } from './types';

export async function getPaymentStatus({
  authToken,
  storeId,
  paymentId,
}: GetPaymentStatusPayload) {
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(authToken, storeId);

  if (!customConfig) {
    throw { message: 'Failed to fetch the custom object', statusCode: 400 };
  }

  // Prepare payload for the service connection
  const connectOpts = {
    merchantId: customConfig.merchantId,
    integrator: customConfig.integrator,
    apiKey: customConfig.apiKey,
    apiSecret: customConfig.apiSecret,
    host: customConfig.host,
  };

  // Prepare service payload for get payment status
  const paymentServiceResponse = await getPaymentStatusService(
    connectOpts,
    paymentId
  );

  // Response only have status
  return paymentServiceResponse;
}
