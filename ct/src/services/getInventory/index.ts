import { ApiClient } from '../../clients';
import query from './query';
import { getInventoryResponseMapper } from '../../mappers';
import { GetInventoryResponse } from '../../types';

export async function getInventory(authToken: string, skus: string) {
  const apiClient = new ApiClient();
  apiClient.setBody({
    query,
    variables: {
      where: `sku in (${skus})`,
      limit: skus?.split(',')?.length || 0,
    },
  });
  apiClient.setAuthHeader(authToken);
  const result = (await apiClient.execute()) as GetInventoryResponse;
  return getInventoryResponseMapper(result);
}
