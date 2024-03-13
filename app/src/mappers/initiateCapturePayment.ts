import { Order } from '@worldline/ctintegration-ct';
import { Payment, CustomObject } from '../types';
import Constants from '../constants';

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
  const { CRON } = Constants;
  switch (mode) {
    case CRON.endOfDay:
      return 12;
    case CRON.afterOneDay:
      return 24;
    case CRON.afterTwoDay:
      return 48;
    case CRON.afterThreeDay:
      return 72;
    case CRON.afterFourDay:
      return 96;
    case CRON.afterFiveDay:
      return 120;
    case CRON.afterSixDay:
      return 144;
    case CRON.afterSevenDay:
      return 168;
    default:
      return 1;
  }
}
