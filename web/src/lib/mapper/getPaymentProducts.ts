import { QueryParams } from '../types';
import { pick } from './common';

export function getPaymentProductsRequiredProps(queryString: QueryParams) {
  return pick(queryString, ['storeId', 'countryCode', 'currencyCode']);
}

export function getPaymentProductsPayload(queryString: QueryParams) {
  const storeId = queryString.storeId?.toString();
  const countryCode = queryString.countryCode?.toString();
  const currencyCode = queryString.currencyCode?.toString();

  return {
    countryCode,
    storeId,
    currencyCode,
  };
}
