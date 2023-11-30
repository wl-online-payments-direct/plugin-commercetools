import { MeApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';
import { ICart } from './types';

export async function getMyCart(authToken: string) {
  const apiClient = new MeApiClient({ authToken });
  apiClient.setBody({
    query,
    variables: {},
  });
  const result = (await apiClient.execute()) as ICart;
  return mapper(result);
}
