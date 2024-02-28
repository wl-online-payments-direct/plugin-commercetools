import { Order } from '@worldline/ctintegration-ct';
import { GetOrderPayload, PaymentDetailsPayload } from '../types';

export function getOrderDBPayload(payload: GetOrderPayload) {
  const { paymentId = '' } = payload || {};
  return { paymentId };
}

export function getOrderResponseMapper(
  payload: PaymentDetailsPayload,
  order: Order,
) {
  const {
    id: worldlineId,
    status,
    statusOutput: { statusCode = 0 },
    paymentOutput: {
      paymentMethod = '',
      references: { merchantReference: paymentId = '' },
      amountOfMoney: { amount = 0, currencyCode = '' },
      cardPaymentMethodSpecificOutput,
    },
    Operations,
  } = payload || {};

  const cardNumber = cardPaymentMethodSpecificOutput?.card?.cardNumber ?? '';
  const bin = cardPaymentMethodSpecificOutput?.card?.bin ?? '';

  const fraudResults = cardPaymentMethodSpecificOutput?.fraudResults ?? {};

  const mappedOperations = Operations.map((operation) => ({
    id: operation.id,
    amountOfMoney: operation.amountOfMoney,
    status: operation.status,
    time: operation.statusOutput.statusCodeChangeDateTime,
  }));
  // Calculate already refunded and already captured amounts
  const alreadyRefundedAmount = mappedOperations
    .filter((operation) => operation.status === 'REFUNDED')
    .reduce((total, operation) => total + operation.amountOfMoney.amount, 0);

  const alreadyCapturedAmount = mappedOperations
    .filter((operation) => operation.status === 'CAPTURED')
    .reduce((total, operation) => total + operation.amountOfMoney.amount, 0);

  const alreadyCancelledAmount = mappedOperations
    .filter((operation) => operation.status === 'CANCELLED')
    .reduce((total, operation) => total + operation.amountOfMoney.amount, 0);

  return {
    worldlineId,
    paymentId,
    orderId: order.id,
    customerEmail: order.customerEmail,
    paymentMethod,
    status,
    statusCode,
    amount,
    currencyCode,
    alreadyRefundedAmount,
    alreadyCapturedAmount,
    alreadyCancelledAmount,
    card: {
      cardNumber,
      bin,
    },
    fraudResults,
    Operations: mappedOperations,
  };
}
