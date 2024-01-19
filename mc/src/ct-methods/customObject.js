import { fetcher } from '../services/custom-api-request';
import CONFIG from '../../configuration';

const { CTP_PROJECT_KEY, CONTAINER_NAME, CONTAINER_KEY } = CONFIG;

export const createCustomObject = async (draft) => {
  try {
    const customObject = await fetcher(`/${CTP_PROJECT_KEY}/custom-objects`, {
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

export const getCustomObject = async () => {
  try {
    const customObject = await fetcher(
      `/${CTP_PROJECT_KEY}/custom-objects/${CONTAINER_NAME}/${CONTAINER_KEY}`,
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
