import { connectService } from '../client';
import { ConnectOpts } from '../types';

export async function getPaymentService(
  connectOpts: ConnectOpts,
  paymentId: string,
) {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.payments.getPayment(merchantId, paymentId, {});
  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the get payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return result.body;
}