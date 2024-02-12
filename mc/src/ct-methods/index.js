import { fetcher } from '../services/custom-api-request';
import CONFIG from '../../configuration';
const { CONTAINER_NAME } = CONFIG;

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

export const getPaymentMethods = async (projectKey, storeId, apiHost) => {
  try {
    const response = await fetcher(`/proxy/forward-to`, {
      method: 'GET',
      headers: {
        'Accept-version': 'v2',
        'X-Forward-To': `${apiHost}/payment/products?storeId=${storeId}&countryCode=UK&currencyCode=EUR`,
        'X-Forward-To-Audience-Policy': 'forward-url-full-path', // default config policy
        'X-Project-Key': projectKey,
      },
    });
    return response;
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};

export const uploadImages = async (projectKey, formdata, apiHost) => {
  try {
    const response = await fetcher(`/proxy/forward-to`, {
      method: 'POST',
      body: formdata,
      headers: {
        'Accept-version': 'v2',
        'X-Forward-To': `${apiHost}/upload/images`,
        'X-Forward-To-Audience-Policy': 'forward-url-full-path', // default config policy
        'X-Project-Key': projectKey,
      },
    });

    return response;
  } catch (error) {
    console.error('Error uploading image:', error.message);
  }
};

export const getOrderList = async (apiHost, projectKey, storeId, page, orderId, limit, filterOption) => {
  const storeQuery = `storeId=${storeId}`
  const pageQuery = page ? `&page=${page}` : ''
  const orderQuery = orderId ? `&orderId=${orderId}` : ''
  const filterQuery = filterOption !== 'ALL' ? `&filterOption=${filterOption}` : ''
  const limitQuery = limit ? `&limit=${limit}` : ''

  try {
    const response = await fetcher(`/proxy/forward-to`, {
      method: 'GET',
      headers: {
        'Accept-version': 'v2',
        'X-Forward-To': `${apiHost}/orders?${storeQuery}${pageQuery}${orderQuery}${limitQuery}${filterQuery}`,
        'X-Forward-To-Audience-Policy': 'forward-url-full-path',
        'X-Project-Key': projectKey,
      },
    });
    return response;
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};

export const getOrderDetails = async (apiHost, projectKey, paymentId) => {

  try {
    const response = await fetcher(`/proxy/forward-to`, {
      method: 'GET',
      headers: {
        'Accept-version': 'v2',
        'X-Forward-To': `${apiHost}/order?paymentId=${paymentId}`,
        'X-Forward-To-Audience-Policy': 'forward-url-full-path',
        'X-Project-Key': projectKey,
      },
    });
    return response;
  } catch (error) {
    console.error('Error custom object:', error.message);
  }
};
