import { CustomerResponse } from '../types';

const getCustomerResponseMapper = (response: CustomerResponse) => {
  if (response?.body?.errors || !response.body?.data?.customers) {
    throw {
      message: '[CT] Failed to get customer ',
      statusCode: 500,
      details: response?.body?.errors,
    };
  }
  return response?.body?.data?.customers?.results[0];
};

export { getCustomerResponseMapper };
