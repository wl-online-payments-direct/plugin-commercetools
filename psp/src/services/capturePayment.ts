import { connectService } from '../client';
import {
  CapturePaymentRequest,
  CapturePaymentResponse,
  ConnectOpts,
} from '../types';

export async function capturePaymentService(
  connectOpts: ConnectOpts,
  payload: CapturePaymentRequest,
  paymentId: string,
): Promise<CapturePaymentResponse> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.payments.capturePayment(
    merchantId,
    paymentId,
    payload,
    {},
  );
  if (result.body?.errors) {
    throw {
      message: 'Failed to process the capture payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }
  const { id, status } = result.body;
  return { id, status };
}
