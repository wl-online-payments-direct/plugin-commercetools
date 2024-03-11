import { ApiClient } from '../../clients';
import query from './query';
import { CustomerResponse } from '../../types';
import { getCustomerResponseMapper } from '../../mappers';

export async function getCustomer(customerId?: string, customerEmail?: string) {
  // Initialize api client
  const apiClient = new ApiClient();

  let whereClause = '';

  if (customerId) {
    whereClause = `(id="${customerId}")`;
  }

  if (customerEmail) {
    whereClause = `(email="${customerEmail}")`;
  }

  apiClient.setBody({
    query,
    variables: {
      where: whereClause,
    },
  });

  const response = (await apiClient.execute()) as CustomerResponse;

  return getCustomerResponseMapper(response);
}
