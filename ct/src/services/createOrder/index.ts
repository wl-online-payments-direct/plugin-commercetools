import { ApiClient } from '../../clients';
import query from './query';
import { createOrderResponseMapper, getVariables } from '../../mappers';
import { CreateOrderPayload, CreateOrderResponse } from '../../types';

export async function createOrder(payload: CreateOrderPayload) {
  // Initialize api client
  const apiClient = new ApiClient();
  apiClient.setBody({
    query,
    variables: getVariables(payload),
  });

  apiClient.setAuthHeader(payload.accessToken);

  const response = (await apiClient.execute()) as CreateOrderResponse;

  const order = createOrderResponseMapper(response);

  return order;
}
