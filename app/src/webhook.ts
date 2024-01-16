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
  const payment = await getPayment(getPaymentDBPayload(payload));

  if (!payment) {
    throw {
      message: 'Failed to fetch the payment',
      statusCode: 500,
    };
  }

  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payment.storeId);

  if (!authenticateWebhook(payload, signature, customConfig.webhookSecret)) {
    throw {
      message: 'Unauthorized request!',
      statusCode: 403,
    };
  }

  switch (payload.type) {
    case 'payment.created':
      return orderPaymentHandler(payload);

    default:
      logger().warn(`[WEBHOOK] Received payload type: ${payload.type}`);
  }

  return {};
}