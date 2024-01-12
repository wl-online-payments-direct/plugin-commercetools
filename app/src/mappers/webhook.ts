import { Cart, Payment } from '@worldline/ctintegration-ct';
import { PaymentPayload } from '../types';

export function getPaymentDBPayload(payload: PaymentPayload) {
  const { merchantReference } = payload.payment.paymentOutput.references;
  return {
    paymentId: merchantReference,
  };
}

export function getPaymentFilterQuery(payment: { id: string }) {
  return { id: payment.id };
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

export function getUpdateCartPayload(cart: Cart, payment: Payment) {
  const { id, version } = cart;
  const { id: paymentId } = payment;
  return {
    id,
    version,
    paymentId,
  };
}

export function hasEqualAmounts(payload: PaymentPayload, cart: Cart): boolean {
  return (
    payload.payment.paymentOutput.amountOfMoney.amount !==
    cart.taxedPrice?.totalGross?.centAmount
  );
}

export function isPaymentProcessing(state: string): boolean {
  return state === 'PROCESSING';
}

export function getMappedStatus(payload: PaymentPayload) {
  const statusMapper: { [key: string]: string } = {
    CREATED: 'INITIAL',
    REDIRECTED: 'REDIRECTED',
    AUTHORIZATION_REQUESTED: 'AUTHORIZATION_REQUESTED',
    CAPTURED: 'CAPTURED',
    REFUNDED: 'REFUNDED',
    PENDING_CAPTURE: 'AUTHORIZED',
    CAPTURE_REQUESTED: 'CAPTURE_REQUESTED',
    REFUND_REQUESTED: 'REFUND_REQUESTED',
    CANCELLED: 'FAILED',
    REJECTED: 'FAILED',
    REJECTED_CAPTURE: 'FAILED',
  };
  return statusMapper[payload.payment.status] || '';
}
