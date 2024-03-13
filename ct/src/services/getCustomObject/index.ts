import { ApiClient } from '../../clients';
import query from './query';
import { CustomObjectResponse } from '../../types';
import Constants from '../../constants';

export async function getCustomObject(storeId: string) {
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

  const response = (await apiClient.execute()) as CustomObjectResponse;

  return response.body.data.customObject;
}
