import { getCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { cancelPaymentService } from '@worldline/ctintegration-psp';
import { ICancelPaymentPayload } from './types';
import {
  getConnectionServiceProps,
  getPaymentCancelServicePayload,
  hasValidAmount,
} from './mappers';

export async function cancelPayment(payload: ICancelPaymentPayload) {
  // Fetch CT order
  const order = await getOrderById(payload.orderId);
  //  Check cancel amount is vaild or not
  const amount = hasValidAmount(order, payload.amount);
  if (amount.isGreater) {
    throw new Error('Cancel amount is not valid!');
  }
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);

  const payment = await cancelPaymentService(
    getConnectionServiceProps(customConfig),
    getPaymentCancelServicePayload(payload),
    payload.paymentId,
  );
  return payment;
}
