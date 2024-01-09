import { MeApiClient } from '../../clients';
import query from './query';
import { getCustomObjectsResponseMapper } from '../../mappers';
import { CustomObjects, CustomObjectsResponse } from '../../types';

export async function getMyCustomObjects(
  authToken: string,
  storeId: string,
): Promise<CustomObjects> {
  // Initialize me client
  const apiClient = new MeApiClient({ authToken });

  const variables = {
    containerName: storeId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as CustomObjectsResponse;

  const configuration = getCustomObjectsResponseMapper(storeId, response);

  return configuration;
}
