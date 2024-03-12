import { ApiClient } from '../../clients';
import query from './query';
import { GetAllCustomObjectResponse } from '../../types';
import Constants from '../../constants';

export async function getAllCustomObjects() {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    containerName: Constants.CUSTOM_OBJECT.CONTAINER_NAME,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as GetAllCustomObjectResponse;

  return response;
}
