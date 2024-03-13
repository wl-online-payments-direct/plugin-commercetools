import {
  getCustomObjects,
  getOrderById,
  getPaymentById,
  Order,
} from '@worldline/ctintegration-ct';
import { getPaymentService } from '@worldline/ctintegration-psp';
import { getPayment } from '@worldline/ctintegration-db';
import { GetOrderPayload, Transaction } from './types';
import {
  getConnectionServiceProps,
  getOrderDBPayload,
  getOrderResponseMapper,
} from './mappers';

export async function getCancelTransactionsInOrder(
  orderPayload: Order,
): Promise<Transaction[]> {
  const payments = orderPayload.paymentInfo?.payments || [];
  const transactionsInOrder: Transaction[] = [];

  await Promise.all(
    payments.map(async (payment) => {
      const ctPayment = await getPaymentById(payment.id);

      if (ctPayment.transactions) {
        // Push 'CancelAuthorization' transactions
        ctPayment.transactions
          .filter((transaction) => transaction.type === 'CancelAuthorization')
          .forEach((transaction) => transactionsInOrder.push(transaction));
      }
    }),
  );

  return transactionsInOrder;
}

export async function getOrder(payload: GetOrderPayload) {
  const payment = await getPayment(getOrderDBPayload(payload));

  if (!payment) {
    throw {
      message: `Failed to fetch the payment for paymentId: '${payload.paymentId}'`,
      statusCode: 500,
    };
  }
  if (!payment.worldlineId) {
    throw {
      message: `Failed to fetch the service information for paymentId: '${payload.paymentId}'`,
      statusCode: 500,
    };
  }
  if (!payment.orderId) {
    throw {
      message: `Failed to fetch the service information for paymentId: '${payload.paymentId}'`,
      statusCode: 500,
    };
  }

  // Prepare service payload for get payment
  const serviceResponse = await getPaymentService(
    getConnectionServiceProps(await getCustomObjects(payment.storeId)),
    payment.worldlineId,
  );

  const ctOrder = await getOrderById(payment.orderId);

  const cancelTransactions = await getCancelTransactionsInOrder(ctOrder);

  return getOrderResponseMapper(serviceResponse, ctOrder, cancelTransactions);
}
