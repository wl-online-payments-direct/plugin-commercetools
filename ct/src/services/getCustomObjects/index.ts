import { ApiClient } from "./../../clients";
import query from "./query";
import mapper from "./mapper";
import { getCustomObjectsCache } from "./../../cache";

export async function getCustomObjects() {
  const cache = await getCustomObjectsCache();
  if (cache) {
    return cache;
  }

  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    containerName: "wl-configuration",
  };

  apiClient.setBody({
    query,
    variables,
  });

  const result = await apiClient.execute();

  return mapper(result);
}
