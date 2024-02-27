import { CustomObject, Order } from '@worldline/ctintegration-ct';
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

export function calculateTimeDifferenceInHours(order: Order): number {
  const orderDate: Date = new Date(order.createdAt);
  const currentDate: Date = new Date();
  const timeDiff: number = Math.abs(
    currentDate.getTime() - orderDate.getTime(),
  );
  const hoursDiff: number = Math.ceil(timeDiff / (1000 * 3600));
  return hoursDiff;
}

export function mapCaptureAuthorizationModeToHours(
  customObject: CustomObject,
): number {
  const mode = customObject.value.captureAuthorizationMode;
  switch (mode) {
    case 'at the end of day':
      return 24;
    case 'after 1 day':
      return 24;
    case 'after two days':
      return 48;
    case 'after three days':
      return 72;
    case 'after four days':
      return 96;
    case 'after five days':
      return 120;
    case 'after six days':
      return 144;
    case 'after seven days':
      return 168;
    default:
      return 1;
  }
}
