import { Cart } from '@commercetools/platform-sdk';
import { ApiClient } from '../../clients';
import query from './query';
import { recalculateCartResponseMapper } from '../../mappers';
import { RecalculateCartResponse } from '../../types';

export async function recalculateCart(authToken: string, cart: Cart) {
  const apiClient = new ApiClient();
  apiClient.setBody({
    query,
    variables: {
      id: cart.id,
      version: cart.version,
      updateProductData: true, // this should be true for recalculate
    },
  });
  apiClient.setAuthHeader(authToken);
  const result = (await apiClient.execute()) as RecalculateCartResponse;
  return recalculateCartResponseMapper(result);
}
