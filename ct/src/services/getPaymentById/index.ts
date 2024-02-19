import { ApiClient } from '../../clients';
import query from './query';
import { getPaymentByIdResponseMapper } from '../../mappers';
import { PaymentById } from '../../types';

export async function getPaymentById(paymentId: string) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    paymentId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const result = (await apiClient.execute()) as PaymentById;

  return getPaymentByIdResponseMapper(result);
}
