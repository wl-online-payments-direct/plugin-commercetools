import { ApiClient } from '../../clients';
import query from './query';
import { getCustomObjectsResponseMapper } from '../../mappers';
import { getCustomObjectsCache, setCustomObjectsCache } from '../../cache';
import { CustomObjects, CustomObjectsResponse } from '../../types';

export async function getCustomObjects(
  storeId: string,
  useCache = true,
): Promise<CustomObjects> {
  // Fetch from cache
  const cache = await getCustomObjectsCache(storeId);
  if (useCache && cache) {
    return cache;
  }

  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    containerName: storeId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as CustomObjectsResponse;

  const configuration = getCustomObjectsResponseMapper(storeId, response);

  if (configuration) {
    await setCustomObjectsCache(storeId, configuration);
  }

  return configuration;
}
