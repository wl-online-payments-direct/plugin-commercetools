import { Order, Payment } from '@commercetools/platform-sdk';
import { ApiClient } from '../../clients';
import getMutation from './query';
import { updatePaymentResponseMapper } from '../../mappers';
import { UpdatePaymentResponse } from '../../types';

export async function updatePayment(
  order: Order,
  payment: Payment,
  payload: any,
) {
  const { id: orderId, version: orderVersion } = order;
  const { id: paymentId, version: paymentVersion } = payment;
  const {
    payment: {
      id: pspId,
      paymentOutput: { paymentMethod: pspPaymentMethod },
    },
  } = payload;

  const shouldIncludeInterfaceId = !payment?.interfaceId;

  const apiClient = new ApiClient();
  const variables = {
    orderId,
    orderVersion,
    paymentId,
    paymentVersion,
    methodInfoName: pspPaymentMethod,
    methodInfoLocale: 'en',
    interfaceId: pspId,
    orderState: 'Confirmed',
    orderPaymentState: 'Paid',
  };

  apiClient.setBody({
    query: getMutation(shouldIncludeInterfaceId),
    variables,
  });

  const response = (await apiClient.execute()) as UpdatePaymentResponse;

  const mappedResult = updatePaymentResponseMapper(response);

  return mappedResult;
}
