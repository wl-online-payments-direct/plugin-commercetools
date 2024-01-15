import { getCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { capturePaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICapturePaymentPayload } from './types';
import {
  getConnectionServiceProps,
  getCaptureServicePayload,
  calculateRemainingOrderAmount,
  calculateTotalCaptureAmount,
} from './mappers';

export async function capturePayment(payload: ICapturePaymentPayload) {
  // Fetch CT order
  const ctOrder = await getOrderById(payload.orderId);
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);
  // Calculating all capture amount in order
  const totalCaptureAmount = await calculateTotalCaptureAmount(ctOrder);
  let payment;
  // Check if the capture amount is valid
  const diffAmount = calculateRemainingOrderAmount(ctOrder, totalCaptureAmount);
  if (diffAmount > 0) {
    payment = await capturePaymentService(
      getConnectionServiceProps(customConfig),
      getCaptureServicePayload(payload),
      payload.paymentId,
    );
    return payment;
  }
  if (payload.amount > diffAmount) {
    logger().error('Capture amount cannot be greater than the order amount!');
  }
  return {};
}
