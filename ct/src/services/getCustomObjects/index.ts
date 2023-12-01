import { ApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';
import { getCustomObjectsCache, setCustomObjectsCache } from '../../cache';
import { CustomObjects } from './types';

export async function getCustomObjects(
  storeId: string,
): Promise<CustomObjects> {
  // Fetch from cache
  const cache = await getCustomObjectsCache(storeId);
  if (cache) {
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

  const configuration: CustomObjects = mapper(
    storeId,
    await apiClient.execute(),
  );

  if (configuration) {
    await setCustomObjectsCache(storeId, configuration);
  }

  return configuration;
}
