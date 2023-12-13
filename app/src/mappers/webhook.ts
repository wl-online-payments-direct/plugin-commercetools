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
    CREATED: 'SUCCESS',
    CANCELLED: 'FAILED',
    REJECTED: 'FAILED',
    REJECTED_CAPTURE: 'FAILED',
    REDIRECTED: 'FAILED',
    PENDING_CAPTURE: 'PENDING',
    AUTHORIZATION_REQUESTED: 'PENDING',
    CAPTURE_REQUESTED: 'PENDING',
    CAPTURED: 'SUCCESS',
    REFUND_REQUESTED: 'PENDING',
    REFUNDED: 'SUCCESS',
  };
  return statusMapper[payload.payment.status] || '';
}
