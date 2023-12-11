import { Cart, Payment } from '@worldline/ctintegration-ct';
import { WebhookPayload } from '../types';

export function getPaymentDBPayload(payload: WebhookPayload) {
  const { merchantReference } = payload;
  return {
    paymentId: merchantReference,
  };
}

export function validateWebhookPayload(
  payload: WebhookPayload,
  cart: Cart,
  payment: { state: string },
) {
  // Compare the amounts
  if (payload.amount !== cart.taxedPrice?.totalGross?.centAmount) {
    // TODO: send a notification to admin and add a column to save the reason
    throw {
      message: 'Cart amount doesnt match with the paid amount',
      statusCode: 500,
    };
  }

  // Verify the payment state
  if (payment.state === 'PROCESSING') {
    throw {
      message: `Failed to process the payment as it is already in ${payment.state}`,
      statusCode: 500,
    };
  }
}

export function getPaymentFilterQuery(payment: { id: string }) {
  return { id: payment.id };
}

export function getPaymentUpdateQuery() {
  return { status: 'IN_REVIEW', state: 'PROCESSING' };
}

export function getCreateOrderCTPayload(
  cart: Cart,
  token: { access_token: string },
) {
  const { id, version } = cart;
  const { access_token: accessToken } = token;
  return {
    id,
    version,
    accessToken,
  };
}

export function getCreatePaymentCTPayload(cart: Cart) {
  const { centAmount = 0, currencyCode = '' } =
    cart.taxedPrice?.totalGross || {};
  return {
    centAmount,
    currencyCode,
  };
}

export function getUpdateCartPayload(cart: Cart, payment: Payment) {
  const { id, version } = cart;
  const { id: paymentId } = payment;
  return {
    id,
    version,
    paymentId,
  };
}
