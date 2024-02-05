import { env } from 'process';
import { ApiClient } from '../../clients';
import query from './query';
import { getCustomObjectsResponseMapper } from '../../mappers';
import { getCustomObjectsCache, setCustomObjectsCache } from '../../cache';
import { CustomObjects, CustomObjectsResponse } from '../../types';
import Constants from '../../constants';

export async function getCustomObjects(
  storeId: string,
): Promise<CustomObjects> {
  // Fetch from cache
  if (env.ENABLE_CACHE === 'true') {
    const cache = await getCustomObjectsCache(storeId);
    if (cache) {
      return cache;
    }
  }

  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    containerName: Constants.CUSTOM_OBJECT.CONTAINER_NAME,
    key: storeId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as CustomObjectsResponse;

  const configuration = getCustomObjectsResponseMapper(response);

  if (configuration && env.ENABLE_CACHE === 'true') {
    await setCustomObjectsCache(storeId, configuration);
  }

  return configuration;
}
