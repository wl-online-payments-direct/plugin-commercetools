import { Order } from '@worldline/ctintegration-ct';
import { Payment } from '../types/initiateCapturePayment';

export function getInitiateCaptureServicePayload(
  payload: Payment,
  amount: number,
) {
  const { storeId, worldlineId, orderId } = payload;
  return {
    storeId,
    orderId,
    paymentId: worldlineId,
    amount,
  };
}

export function calculateRemainingOrderAmount(
  order: Order,
  totalCaptureAmount: number,
) {
  const totalAmountPlanned = order.taxedPrice?.totalGross?.centAmount ?? 0;
  const remainingAmount = Math.max(0, totalAmountPlanned - totalCaptureAmount);

  return remainingAmount;
}
