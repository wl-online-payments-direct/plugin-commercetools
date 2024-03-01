import {
  getCustomObjects,
  getOrderById,
  Order,
  getPaymentById,
} from '@worldline/ctintegration-ct';
import { cancelPaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICancelPaymentPayload } from './types';
import {
  getConnectionServiceProps,
  getPaymentCancelServicePayload,
  hasValidAmount,
  calculateRemainingOrderAmount,
} from './mappers';

export async function calculateTotalCancelAmount(
  orderPayload: Order,
): Promise<number> {
  // Check if paymentInfo is present and it has an array of payments
  const payments = orderPayload.paymentInfo?.payments || [];

  const totalCancelAmount = await Promise.all(
    payments.map(async (payment) => {
      // Fetch payment details from CT
      const ctPayment = await getPaymentById(payment.id);

      // Check if there are transactions and if they are of type 'Authorization canceled'
      if (
        ctPayment.transactions &&
        ctPayment.transactions.some(
          (transaction) => transaction.type === 'CancelAuthorization',
        )
      ) {
        // Calculate total cancel amount by summing up 'Authorization canceled' transactions
        return ctPayment.transactions
          .filter((transaction) => transaction.type === 'CancelAuthorization')
          .reduce((acc, transaction) => acc + transaction.amount.centAmount, 0);
      }

      return 0; // Return 0 if there are no 'Authorization canceled' transactions
    }),
  );

  return totalCancelAmount.reduce((acc, amount) => acc + amount, 0);
}

export async function cancelPayment(payload: ICancelPaymentPayload) {
  // Fetch CT order
  const order = await getOrderById(payload.orderId);
  if (!order) {
    logger().error('Failed to fetch the order or order is missing!');
    throw {
      message: 'Failed to fetch the order or order is missing!',
      statusCode: 500,
    };
  }
  // Calculating all cancel amount in order
  const totalCancelAmount = await calculateTotalCancelAmount(order);
  let payment;
  const diffAmount = calculateRemainingOrderAmount(order, totalCancelAmount);
  // Check if the cancel amount is valid
  const hasValidCancel = hasValidAmount(order, totalCancelAmount);
  if (
    hasValidCancel.isEqual ||
    (payload.amount > diffAmount && diffAmount !== 0)
  ) {
    logger().error('Cancel amount cannot be greater than the order amount!');
    throw {
      message: 'Cancel amount is not valid!',
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

  if (diffAmount > 0) {
    let isFinal = false;
    if (diffAmount === payload.amount) {
      isFinal = true;
    }
    payment = await cancelPaymentService(
      getConnectionServiceProps(customConfig),
      getPaymentCancelServicePayload(payload, isFinal),
      payload.paymentId,
    );
    return payment;
  }

  return {};
}
