import { fetcher } from '../services/custom-api-request';
import CONFIG from '../../configuration';

const { CONTAINER_NAME, host } = CONFIG;

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
    const response = await fetch(
      `${host}/payment/products?storeId=${storeId}&countryCode=UK&currencyCode=EUR`
    );
    return response.json();
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};

export const uploadImages = async (file) => {
  try {
    const response = await fetch(`${host}/upload/images`, {
      method: 'POST',
      body: file,
      headers: {
        'Content-Type': file.type,
        'Content-Length': `${file.size}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error('Error uploading image:', error.message);
  }
};
