import { ApiClient } from '../../clients';
import query from './query';
import { getCartByIdResponseMapper } from '../../mappers';
import { CartById } from '../../types';

export async function getCartById(cartId: string, authToken?: string) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    cartId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  if (authToken) {
    apiClient.setAuthHeader(authToken);
  }

  const result = (await apiClient.execute()) as CartById;

  return getCartByIdResponseMapper(result);
}
