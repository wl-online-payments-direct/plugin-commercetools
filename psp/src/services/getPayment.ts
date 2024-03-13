import { connectService, getExtraHeaders } from '../client';
import { ConnectOpts } from '../types';

export async function getPaymentService(
  connectOpts: ConnectOpts,
  paymentId: string,
) {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.payments.getPaymentDetails(
    merchantId,
    paymentId,
    {
      extraHeaders: getExtraHeaders(connectOpts),
    },
  );
  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the get payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return result.body;
}
