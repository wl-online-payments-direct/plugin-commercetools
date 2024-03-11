import { QueryParams } from '../types';
import { pick } from './common';

export function getCardsRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['storeId']);
}

export function getCardsAppPayload(queryString: QueryParams) {
  const storeId = queryString.storeId?.toString();
  const customerId = queryString.customerId?.toString();
  const customerEmail = queryString.customerEmail?.toString();

  return {
    storeId,
    customerId,
    customerEmail,
  };
}
