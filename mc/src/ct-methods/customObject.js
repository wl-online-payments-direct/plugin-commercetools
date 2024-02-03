import { fetcher } from '../services/custom-api-request';
import CONFIG from '../../configuration';

const { CONTAINER_NAME, CONTAINER_KEY } = CONFIG;

export const createCustomObject = async (payload, projectKey) => {
  try {
    const customObject = await fetcher(
      `/proxy/ctp/${projectKey}/custom-objects`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    return customObject;
  } catch (error) {
    console.error('Error creating custom object:', error.message);
  }
};

export const getCustomObject = async (projectKey, storeId) => {
  try {
    const customObject = await fetcher(
      `/proxy/ctp/${projectKey}/custom-objects/${CONTAINER_NAME}/${storeId}`,
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

export const getStores = async (projectKey) => {
  try {
    const stores = await fetcher(`/proxy/ctp/${projectKey}/stores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return stores;
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};

export const getPaymentMethods = async (storeId) => {
  try {
    const { result } = await fetch(
      `https://dev-worldline-cto.tryzens-ignite.com/payment/products?storeId=${storeId}&countryCode=UK&currencyCode=EUR`
    );
    return result.json();
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};
