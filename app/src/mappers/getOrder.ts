import { Order } from '@worldline/ctintegration-ct';
import { getOrderMappedStatus } from './common';
import { GetOrderPayload, PaymentDetailsPayload, Transaction } from '../types';

export function getOrderDBPayload(payload: GetOrderPayload) {
  const { paymentId = '' } = payload || {};
  return { paymentId };
}

export function getOrderResponseMapper(
  payload: PaymentDetailsPayload,
  order: Order,
  payment: Transaction[],
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

  // Filter out operations with status 'CANCELLED' before mapping
  const mappedOperations = Operations.filter(
    (operation) => operation.status !== 'CANCELLED',
  ).map((operation) => ({
    id: operation.id,
    amountOfMoney: operation.amountOfMoney,
    status: operation.status,
    time: operation.statusOutput.statusCodeChangeDateTime,
  }));

  // Map payment transactions similar to operations
  const mappedPaymentTransactions = payment.map((transaction) => ({
    amountOfMoney: {
      amount: transaction.amount.centAmount,
      currencyCode: transaction.amount.currencyCode,
    },
    status: 'CANCELLED',
  }));

  // Concatenate mapped operations and payment transactions
  const allTransactions = [...mappedOperations, ...mappedPaymentTransactions];

  // Calculate already refunded and already captured amounts
  const alreadyRefundedAmount = allTransactions
    .filter((operation) => operation.status === 'REFUNDED')
    .reduce((total, operation) => total + operation.amountOfMoney.amount, 0);

  const alreadyCapturedAmount = allTransactions
    .filter((operation) => operation.status === 'CAPTURED')
    .reduce((total, operation) => total + operation.amountOfMoney.amount, 0);

  const alreadyCancelledAmount = allTransactions
    .filter((operation) => operation.status === 'CANCELLED')
    .reduce((total, operation) => total + operation.amountOfMoney.amount, 0);

  return {
    worldlineId,
    paymentId,
    orderId: order.id,
    customerEmail: order.customerEmail,
    paymentMethod,
    status: getOrderMappedStatus(status),
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
    Operations: allTransactions,
  };
}
