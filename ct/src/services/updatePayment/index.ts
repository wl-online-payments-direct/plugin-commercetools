import { Order, Payment } from '@commercetools/platform-sdk';
import { ApiClient } from '../../clients';
import getMutation from './query';
import { updatePaymentResponseMapper } from '../../mappers';
import { PaymentPayload, UpdatePaymentResponse } from '../../types';

export async function updatePayment(payload: PaymentPayload, order: Order) {
  const {
    payment: {
      paymentOutput: {
        paymentMethod,
        references: { merchantReference },
      },
    },
  } = payload;

  // get payments from order
  const payments = (order?.paymentInfo?.payments || []) as unknown as Payment[];

  // get payment based on the dbpaymentId
  const payment = payments.find(
    (py) =>
      (
        py?.custom as unknown as {
          customFieldsRaw: { value: string }[];
        }
      )?.customFieldsRaw?.find((field) => field?.value === merchantReference),
  );

  if (!payment) {
    throw {
      message: `Failed to fetch the payment with payment id '${merchantReference}'`,
      statusCode: 500,
    };
  }

  const { id: paymentId, version: paymentVersion } = payment;

  const apiClient = new ApiClient();
  const variables = {
    paymentId,
    paymentVersion,
    methodInfoName: paymentMethod,
    methodInfoLocale: 'en',
  };

  apiClient.setBody({
    query: getMutation(),
    variables,
  });

  const response = (await apiClient.execute()) as UpdatePaymentResponse;

  const mappedResult = updatePaymentResponseMapper(response);

  return mappedResult;
}
