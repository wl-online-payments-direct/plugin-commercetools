import { logger } from '@worldline/ctintegration-util';
import { connectService } from '../client';
import {
  RefundPaymentRequest,
  RefundPaymentResponse,
  ConnectOpts,
} from '../types';

export async function createRefundPaymentService(
  connectOpts: ConnectOpts,
  payload: RefundPaymentRequest,
  paymentId: string,
): Promise<RefundPaymentResponse> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.payments.refundPayment(
    merchantId,
    paymentId,
    payload,
    {},
  );
  if (result.body?.errors) {
    logger().error(
      `[createRefundPaymentService] Failed to process the service: ${JSON.stringify(
        result?.body?.errors,
      )}`,
    );
    throw {
      message: 'Failed to process the refund payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }
  const { id, status } = result.body;
  return { id, status };
}
