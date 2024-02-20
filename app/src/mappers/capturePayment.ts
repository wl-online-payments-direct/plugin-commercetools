import { Order } from '@worldline/ctintegration-ct';
import { ICapturePaymentPayload } from '../types';

export function getCaptureServicePayload(
  payload: ICapturePaymentPayload,
  isFinal: boolean,
) {
  const { amount } = payload;

  return {
    amount,
    isFinal,
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
