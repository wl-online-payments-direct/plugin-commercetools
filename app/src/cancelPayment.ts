import { getCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { cancelPaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICancelPaymentPayload } from './types';
import {
  getConnectionServiceProps,
  getPaymentCancelServicePayload,
  hasValidAmount,
} from './mappers';

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
  //  Check cancel amount is vaild or not
  const amount = hasValidAmount(order, payload.amount);
  if (amount.isGreater) {
    logger().error('Cancel amount is not valid!');
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

  const payment = await cancelPaymentService(
    getConnectionServiceProps(customConfig),
    getPaymentCancelServicePayload(payload),
    payload.paymentId,
  );

  return payment;
}
