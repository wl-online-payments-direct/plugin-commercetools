import { MeApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';

export async function getMyCart(authToken: string) {
  // Initialize me client
  const apiClient = new MeApiClient({ authToken });

  const variables = {};

  apiClient.setBody({
    query,
    variables,
  });

  const result = await apiClient.execute();

  return mapper(result);
}
