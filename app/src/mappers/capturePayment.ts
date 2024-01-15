import { Order, getPaymentById } from '@worldline/ctintegration-ct';
import { ICapturePaymentPayload, ICaptureDbPaymentPayload } from '../types';

export function getCaptureServicePayload(payload: ICapturePaymentPayload) {
  const { amount, isFinal } = payload;

  return {
    amount,
    isFinal,
  };
}

export function getCaptureDatabasePayload(
  payload: ICaptureDbPaymentPayload,
  amount: number,
  status: string,
  type: string,
) {
  const { storeId, orderId, paymentId, worldlineId } = payload;
  return {
    paymentId,
    storeId,
    orderId,
    worldlineId,
    type,
    amount,
    status,
  };
}

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

export function calculateRemainingOrderAmount(
  order: Order,
  totalCaptureAmount: number,
) {
  const totalAmountPlanned = order.taxedPrice?.totalGross?.centAmount ?? 0;
  const remainingAmount = Math.max(0, totalAmountPlanned - totalCaptureAmount);

  return remainingAmount;
}
