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
  if (authToken) {
    apiClient.setAuthHeader(authToken);
  }

  apiClient.setBody({
    query,
    variables,
  });

  const result = (await apiClient.execute()) as CartById;

  return getCartByIdResponseMapper(result);
}
