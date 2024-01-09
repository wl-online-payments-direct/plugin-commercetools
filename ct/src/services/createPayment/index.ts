import { ApiClient } from '../../clients';
import query from './query';
import { createPaymentResponseMapper } from '../../mappers';
import { CreatePaymentPayload, CreatePaymentResponse } from '../../types';
import { constants } from '../../constants';

export async function createPayment({
  paymentId,
  centAmount,
  currencyCode,
}: CreatePaymentPayload) {
  const apiClient = new ApiClient();
  const variables = {
    draft: {
      amountPlanned: {
        currencyCode,
        centAmount,
      },
      custom: {
        typeKey: constants.CREATE_PAYMENT.TYPE_KEY,
        fields: [
          {
            name: constants.CREATE_PAYMENT.FIELDS.PAYMENTID,
            value: `"${paymentId}"`,
          },
        ],
      },
    },
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as CreatePaymentResponse;

  const mappedResult = createPaymentResponseMapper(response);

  if (!mappedResult) {
    throw {
      message: 'Failed to create the payment using order',
      statusCode: 500,
    };
  }

  return mappedResult;
}
