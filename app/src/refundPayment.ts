import {
  getCustomObjects,
  getOrderById,
  Order,
  getPaymentById,
} from '@worldline/ctintegration-ct';
import { createRefundPaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICreateRefundPayload } from './types';
import {
  getConnectionServiceProps,
  getRefundServicePayload,
  hasValidAmount,
  calculateRemainingOrderAmount,
} from './mappers';

export async function calculateTotalRefundAmount(
  orderPayload: Order,
): Promise<number> {
  // Check if paymentInfo is present and it has an array of payments
  const payments = orderPayload.paymentInfo?.payments || [];

  const totalRefundAmount = await Promise.all(
    payments.map(async (payment) => {
      // Fetch payment details from CT
      const ctPayment = await getPaymentById(payment.id);

      // Check if there are transactions and if they are of type 'Refund'
      if (
        ctPayment.transactions &&
        ctPayment.transactions.some(
          (transaction) => transaction.type === 'Refund',
        )
      ) {
        // Calculate total capture amount by summing up 'Refund' transactions
        return ctPayment.transactions
          .filter((transaction) => transaction.type === 'Refund')
          .reduce((acc, transaction) => acc + transaction.amount.centAmount, 0);
      }

      return 0; // Return 0 if there are no 'Refund' transactions
    }),
  );

  return totalRefundAmount.reduce((acc, amount) => acc + amount, 0);
}

export async function refundPayment(payload: ICreateRefundPayload) {
  // Fetch CT order
  const order = await getOrderById(payload.orderId);
  if (!order) {
    logger().error('Failed to fetch the order or order is missing!');
    throw {
      message: 'Failed to fetch the order or order is missing!',
      statusCode: 500,
    };
  }
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);

  if (!customConfig) {
    logger().error('Failed to fetch configuration from CT custom object');
    throw {
      message: 'Failed to fetch configuration',
      statusCode: 500,
    };
  }
  // Calculating all refund amount in order
  const totalRefundAmount = await calculateTotalRefundAmount(order);

  const diffAmount = calculateRemainingOrderAmount(order, totalRefundAmount);
  // Check if the refund amount is valid
  const hasValidRefund = hasValidAmount(order, totalRefundAmount);
  if (
    hasValidRefund.isEqual ||
    (payload.amount > diffAmount && diffAmount !== 0)
  ) {
    logger().error('Refund amount cannot be greater than the order amount!');
    throw {
      message: 'Refund amount is not valid!',
      statusCode: 500,
    };
  }
  if (diffAmount > 0) {
    const response = await createRefundPaymentService(
      getConnectionServiceProps(customConfig),
      getRefundServicePayload(payload),
      payload.paymentId,
    );
    return response;
  }
  return {};
}
