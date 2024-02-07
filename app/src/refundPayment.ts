import { getCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { createRefundPaymentService } from '@worldline/ctintegration-psp';
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
    throw {
      message: 'Failed to fetch the order or order is missing!',
      statusCode: 500,
    };
  }
  //  Check refund amount is vaild or not
  const hasValidRefund = hasValidAmount(order, payload.amount);
  if (hasValidRefund.isGreater) {
    throw new Error('Refund amount cannot be greater than the order amount!');
  }
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);

  const response = await createRefundPaymentService(
    getConnectionServiceProps(customConfig),
    getRefundServicePayload(payload),
    payload.paymentId,
  );
  return response;
}
