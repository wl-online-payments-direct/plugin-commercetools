import {
  getCustomObjects,
  getOrderById,
  Order,
  getPaymentById,
} from '@worldline/ctintegration-ct';
import { capturePaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICapturePaymentPayload } from './types';
import {
  getConnectionServiceProps,
  getCaptureServicePayload,
  calculateRemainingOrderAmount,
} from './mappers';

export async function calculateTotalCaptureAmount(
  orderPayload: Order,
): Promise<number> {
  // Check if paymentInfo is present and it has an array of payments
  const payments = orderPayload.paymentInfo?.payments || [];

  const totalCaptureAmount = await Promise.all(
    payments.map(async (payment) => {
      // Fetch payment details from CT
      const ctPayment = await getPaymentById(payment.id);

      // Check if there are transactions and if they are of type 'Charge'
      if (
        ctPayment.transactions &&
        ctPayment.transactions.some(
          (transaction) => transaction.type === 'Charge',
        )
      ) {
        // Calculate total capture amount by summing up 'Charge' transactions
        return ctPayment.transactions
          .filter((transaction) => transaction.type === 'Charge')
          .reduce((acc, transaction) => acc + transaction.amount.centAmount, 0);
      }

      return 0; // Return 0 if there are no 'Charge' transactions
    }),
  );

  return totalCaptureAmount.reduce((acc, amount) => acc + amount, 0);
}

export async function capturePayment(payload: ICapturePaymentPayload) {
  // Fetch CT order
  const ctOrder = await getOrderById(payload.orderId);
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);

  if (!customConfig) {
    logger().error('Failed to fetch configuration from CT custom object');
    throw {
      message: 'Failed to fetch configuration',
      statusCode: 500,
    };
  }
  // Calculating all capture amount in order
  const totalCaptureAmount = await calculateTotalCaptureAmount(ctOrder);
  let payment;
  // Check if the capture amount is valid
  const diffAmount = calculateRemainingOrderAmount(ctOrder, totalCaptureAmount);
  if (diffAmount > 0) {
    let isFinal = false;
    if (diffAmount === payload.amount) {
      isFinal = true;
    }
    payment = await capturePaymentService(
      getConnectionServiceProps(customConfig),
      getCaptureServicePayload(payload, isFinal),
      payload.paymentId,
    );
    return payment;
  }
  if (payload.amount > diffAmount) {
    logger().error('Capture amount cannot be greater than the order amount!');
    throw {
      message: 'Capture amount is not valid!',
      statusCode: 500,
    };
  }
  return {};
}
