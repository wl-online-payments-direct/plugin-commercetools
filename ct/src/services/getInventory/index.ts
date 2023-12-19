import { MeApiClient } from '../../clients';
import query from './query';
import { getInventoryResponseMapper } from '../../mappers';
import { GetInventoryResponse } from '../../types';

export async function getInventory(authToken: string, skus: string) {
  const apiClient = new MeApiClient({ authToken });
  apiClient.setBody({
    query,
    variables: {
      where: `sku in (${skus})`,
    },
  });
  const result = (await apiClient.execute()) as GetInventoryResponse;
  return getInventoryResponseMapper(result);
}
