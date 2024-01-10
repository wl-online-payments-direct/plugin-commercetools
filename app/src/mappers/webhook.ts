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

export function shouldSaveToken(
  cart: Cart,
  payment: { storePermanently: boolean },
) {
  return cart?.customerId && payment.storePermanently;
}

export function getCustomerTokenPayload(
  cart: Cart,
  payment: { id: string },
  payload: PaymentPayload,
) {
  const { customerId = '' } = cart || {};
  const { id: paymentId } = payment;
  const { token = '' } =
    payload?.payment?.paymentOutput?.cardPaymentMethodSpecificOutput ||
    payload?.payment?.paymentOutput?.redirectPaymentMethodSpecificOutput ||
    {};

  return {
    customerId,
    paymentId,
    token,
  };
}
