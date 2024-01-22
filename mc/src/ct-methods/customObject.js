import { fetcher } from '../services/custom-api-request';
import CONFIG from '../../configuration';

const { CONTAINER_NAME, CONTAINER_KEY } = CONFIG;

export const createCustomObject = async (draft, projectKey) => {
  try {
    const customObject = await fetcher(`/proxy/ctp/${projectKey}/custom-objects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(draft),
    });
    return customObject;
  } catch (error) {
    console.error('Error creating custom object:', error.message);
  }
};

export const getCustomObject = async (projectKey) => {
  try {
    const customObject = await fetcher(
      `/proxy/ctp/${projectKey}/custom-objects/${CONTAINER_NAME}/${CONTAINER_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return customObject;
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};
