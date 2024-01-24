import { MeApiClient } from '../../clients';
import query from './query';
import { getCartResponseMapper } from '../../mappers';
import { GetCartResponse } from '../../types';

export async function getCart(cartId: string, authToken: string) {
  const apiClient = new MeApiClient({ authToken });
  apiClient.setBody({
    query,
    variables: {
      cartId,
    },
  });
  const result = (await apiClient.execute()) as GetCartResponse;
  return getCartResponseMapper(result);
}
