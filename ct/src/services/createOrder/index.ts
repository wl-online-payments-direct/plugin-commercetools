import { ApiClient } from '../../clients';
import query from './query';
import { createOrderResponseMapper } from '../../mappers';
import { CreateOrderPayload, CreateOrderResponse } from '../../types';

export async function createOrder({
  id,
  version,
  accessToken,
}: CreateOrderPayload) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    id, // cart id
    version,
  };

  apiClient.setBody({
    query,
    variables,
  });

  apiClient.setAuthHeader(accessToken);

  const response = (await apiClient.execute()) as CreateOrderResponse;

  const order = createOrderResponseMapper(response);

  return order;
}
