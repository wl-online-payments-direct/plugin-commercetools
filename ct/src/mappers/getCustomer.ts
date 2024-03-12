import { CustomerResponse } from '../types';

const getCustomerResponseMapper = (response: CustomerResponse) =>
  response?.body?.data?.customers?.results[0];

export { getCustomerResponseMapper };
