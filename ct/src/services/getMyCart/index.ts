import { MeApiClient } from '../../clients';
import query from './query';
import { getMyCartResponseMapper } from '../../mappers';
import { MyCartResponse } from '../../types';

export async function getMyCart(authToken: string) {
  const apiClient = new MeApiClient({ authToken });
  apiClient.setBody({
    query,
    variables: {},
  });
  const result = (await apiClient.execute()) as MyCartResponse;
  return getMyCartResponseMapper(result);
}
