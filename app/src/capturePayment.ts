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
    payment = await capturePaymentService(
      getConnectionServiceProps(customConfig),
      getCaptureServicePayload(payload),
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
