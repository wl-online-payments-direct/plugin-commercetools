import { getCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { createRefundPaymentService } from '@worldline/ctintegration-psp';
import { logger } from '@worldline/ctintegration-util';
import { ICreateRefundPayload, ICreateRefundResponse } from './types';
import {
  getConnectionServiceProps,
  getRefundServicePayload,
  hasValidAmount,
} from './mappers';

export async function refundPayment(
  payload: ICreateRefundPayload,
): Promise<ICreateRefundResponse> {
  // Fetch CT order
  const order = await getOrderById(payload.orderId);
  if (!order) {
    logger().error('Failed to fetch the order or order is missing!');
    throw {
      message: 'Failed to fetch the order or order is missing!',
      statusCode: 500,
    };
  }
  //  Check refund amount is vaild or not
  const hasValidRefund = hasValidAmount(order, payload.amount);
  if (hasValidRefund.isGreater) {
    logger().error('Refund amount cannot be greater than the order amount!');
    throw {
      message: 'Refund amount cannot be greater than the order amount!',
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

  const response = await createRefundPaymentService(
    getConnectionServiceProps(customConfig),
    getRefundServicePayload(payload),
    payload.paymentId,
  );
  return response;
}
