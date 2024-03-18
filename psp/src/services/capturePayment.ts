import { logger } from '@worldline/ctintegration-util';
import { connectService, getExtraHeaders } from '../client';
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
    {
      extraHeaders: getExtraHeaders(connectOpts),
    },
  );
  if (result.body?.errors) {
    logger().error(
      `[capturePaymentService] Failed to process the service: ${JSON.stringify(
        result?.body?.errors,
      )}`,
    );
    throw {
      message: 'Failed to process the capture payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }
  const { id, status } = result.body;
  return { id, status };
}
