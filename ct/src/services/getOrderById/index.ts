import { ApiClient } from '../../clients';
import query from './query';
import { getOrderByIdResponseMapper } from '../../mappers';
import { OrderById } from '../../types';

export async function getOrderById(orderId: string) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    orderId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const result = (await apiClient.execute()) as OrderById;

  return getOrderByIdResponseMapper(result);
}
