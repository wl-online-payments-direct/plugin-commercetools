import { Order, Payment } from '@commercetools/platform-sdk';
import { ApiClient } from '../../clients';
import getMutation from './query';
import { updatePaymentResponseMapper } from '../../mappers';
import { PaymentPayload, UpdatePaymentResponse } from '../../types';

export async function updatePayment(
  order: Order,
  dbPaymentId: string,
  payload: PaymentPayload,
) {
  const { id: orderId, version: orderVersion } = order;

  // get payments from order
  const payments = (order?.paymentInfo?.payments || []) as unknown as Payment[];

  // get payment based on the dbpaymentId
  const payment = payments.find(
    (py) =>
      (
        py?.custom as unknown as {
          customFieldsRaw: { [key: string]: string }[];
        }
      )?.customFieldsRaw?.find((field) => field?.value === dbPaymentId),
  );

  if (!payment) {
    throw {
      message: `Failed to fetch the payment with payment id '${dbPaymentId}'`,
      statusCode: 500,
    };
  }

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
