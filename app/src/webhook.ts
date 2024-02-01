import crypto from 'crypto';
import { logger } from '@worldline/ctintegration-util';
import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPayment } from '@worldline/ctintegration-db';
import { PaymentPayload } from './types';
import { orderPaymentHandler } from './common';
import { getPaymentDBPayload } from './mappers';

const authenticateWebhook = (
  payload: PaymentPayload,
  signature: string,
  webhookSecret: string,
) => {
  try {
    const stringifyPayload = JSON.stringify(payload);
    if (!stringifyPayload) {
      return false;
    }
    // Create a hash using the body and our key
    const hash = crypto
      .createHmac('sha256', webhookSecret)
      .update(stringifyPayload)
      .digest('base64');

    // Compare our hash to Worldline hash
    return hash === signature;
  } catch (e) {
    return false;
  }
};

export async function webhookAppHandler({
  payload,
  signature,
}: {
  payload: PaymentPayload;
  signature: string;
}) {
  logger().debug(`[Webhook][${payload.type}] Request received`);

  const payment = await getPayment(getPaymentDBPayload(payload));

  if (!payment) {
    throw {
      message: 'Failed to fetch the payment',
      statusCode: 500,
    };
  }

  logger().debug(
    `[Webhook][${payload.type}] Received payment ${payment.id} from database`,
  );

  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payment.storeId);

  if (!authenticateWebhook(payload, signature, customConfig.webhookSecret)) {
    throw {
      message: 'Unauthorized request!',
      statusCode: 403,
    };
  }

  logger().debug(`[Webhook][${payload.type}] Successfully authenticated`);

  switch (payload.type) {
    case 'payment.created':
    case 'payment.pending_capture':
    case 'payment.captured':
    case 'payment.capture_requested':
    case 'payment.cancelled':
    case 'payment.rejected':
    case 'payment.rejected_capture':
      return orderPaymentHandler(payload);

    default:
      logger().warn(`[Webhook] Received payload type: ${payload.type}`);
  }

  return {};
}
