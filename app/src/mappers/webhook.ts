import { Cart, Payment, Order } from '@worldline/ctintegration-ct';
import { PaymentPayload, RefundPayload, RefundResult } from '../types';

export function getPaymentDBPayload(payload: PaymentPayload | RefundPayload) {
  let merchantReference: string;
  if ('payment' in payload) {
    merchantReference =
      payload.payment.paymentOutput.references.merchantReference;
  } else if ('refund' in payload) {
    merchantReference =
      payload.refund.refundOutput.references.merchantReference;
  } else {
    throw new Error('Invalid payload type');
  }

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

export function hasValidAmount(order: Order, amount: number): RefundResult {
  const totalAmountPlanned = order.taxedPrice?.totalGross?.centAmount ?? 0;
  return {
    isEqual: totalAmountPlanned === amount,
    isGreater: totalAmountPlanned < amount,
  };
}

export function isPaymentProcessing(state: string): boolean {
  return state === 'PROCESSING';
}

export function getMappedStatus(payload: PaymentPayload | RefundPayload) {
  const statusMapper: { [key: string]: string } = {
    CREATED: 'INITIAL',
    REDIRECTED: 'REDIRECTED',
    AUTHORIZATION_REQUESTED: 'AUTHORIZATION_REQUESTED',
    CAPTURED: 'CAPTURED',
    REFUNDED: 'REFUNDED',
    PENDING_CAPTURE: 'AUTHORIZED',
    CAPTURE_REQUESTED: 'CAPTURE_REQUESTED',
    REFUND_REQUESTED: 'REFUND_REQUESTED',
    CANCELLED: 'CANCELLED',
    REJECTED: 'FAILED',
    REJECTED_CAPTURE: 'FAILED',
  };

  if ('payment' in payload) {
    return statusMapper[payload.payment.status];
  }
  if ('refund' in payload) {
    return statusMapper[payload.refund.status];
  }

  return '';
}
