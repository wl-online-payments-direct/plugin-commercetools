import { MeApiClient } from "./../../clients";
import query from "./query";
import mapper from "./mapper";
import { getCustomObjectsCache } from "./../../cache";

export async function getCustomObjects(authToken: string, storeId: string) {
  const cache = await getCustomObjectsCache();
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

  return mapper(storeId, result);
}
