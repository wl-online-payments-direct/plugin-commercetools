import { getCustomObjects, getOrderById } from '@worldline/ctintegration-ct';
import { getPaymentService } from '@worldline/ctintegration-psp';
import { getPayment } from '@worldline/ctintegration-db';
import { GetOrderPayload } from './types';
import {
  getConnectionServiceProps,
  getOrderDBPayload,
  getOrderResponseMapper,
} from './mappers';

export async function getOrder(payload: GetOrderPayload) {
  const payment = await getPayment(getOrderDBPayload(payload));
  if (!payment) {
    throw {
      message: `Failed to fetch the payment for paymentId: '${payload.paymentId}'`,
      statusCode: 500,
    };
  }
  if (!payment.worldlineId) {
    throw {
      message: `Failed to fetch the service information for paymentId: '${payload.paymentId}'`,
      statusCode: 500,
    };
  }
  if (!payment.orderId) {
    throw {
      message: `Failed to fetch the service information for paymentId: '${payload.paymentId}'`,
      statusCode: 500,
    };
  }

  // Prepare service payload for get payment
  const serviceResponse = await getPaymentService(
    getConnectionServiceProps(await getCustomObjects(payment.storeId)),
    payment.worldlineId,
  );
  const { customerEmail = ' ' } = await getOrderById(payment.orderId);

  return getOrderResponseMapper(serviceResponse, customerEmail);
}
