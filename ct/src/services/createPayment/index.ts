import { ApiClient } from '../../clients';
import query from './query';
import { createPaymentResponseMapper } from '../../mappers';
import { CreatePaymentPayload, CreatePaymentResponse } from '../../types';

export async function createPayment({
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
