import { MeApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';
import { getCustomObjectsCache, setCustomObjectsCache } from '../../cache';

export async function getCustomObjects(authToken: string, storeId: string) {
  // Fetch from cache
  const cache = await getCustomObjectsCache(storeId);
  if (cache) {
    return cache;
  }

  // Initialize api client
  const apiClient = new MeApiClient({ authToken });

  const variables = {
    containerName: storeId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const result = await apiClient.execute();

  const configuration = mapper(storeId, result);

  if (configuration) {
    await setCustomObjectsCache(storeId, configuration);
  }

  return configuration;
}
