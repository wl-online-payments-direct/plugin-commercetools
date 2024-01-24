import { MeApiClient } from '../../clients';
import query from './query';
import { getCustomObjectsResponseMapper } from '../../mappers';
import { CustomObjects, CustomObjectsResponse } from '../../types';
import Constants from '../../constants';

export async function getMyCustomObjects(
  authToken: string,
  storeId: string,
): Promise<CustomObjects> {
  // Initialize me client
  const apiClient = new MeApiClient({ authToken });

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

  return configuration;
}
