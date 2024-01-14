import { connectService } from '../client';
import {
  CancelPaymentRequest,
  CancelPaymentResponse,
  ConnectOpts,
} from '../types';

export async function cancelPaymentService(
  connectOpts: ConnectOpts,
  payload: CancelPaymentRequest,
  paymentId: string,
): Promise<CancelPaymentResponse> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.payments.cancelPayment(
    merchantId,
    paymentId,
    payload,
    {},
  );
  if (result.body?.errors) {
    throw {
      message: 'Failed to process the cancel payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }
  const { id, status } = result.body;
  return { id, status };
}
