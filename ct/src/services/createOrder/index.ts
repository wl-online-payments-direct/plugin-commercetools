import { ApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';

export async function createOrder(token: string, cartId: string) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    id: cartId,
    version: 1,
  };

  apiClient.setBody({
    query,
    variables,
  });

  apiClient.setAuthHeader(token);

  const response = await apiClient.execute();

  const order = mapper(response);

  if (!order) {
    throw {
      message: `Failed to create the order using cart ${cartId}`,
      statusCode: 500,
    };
  }

  return order;
}
