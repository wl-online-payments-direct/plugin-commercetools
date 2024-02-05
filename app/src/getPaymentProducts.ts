import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getPaymentProducts } from '@worldline/ctintegration-psp';
import { GetPaymentProductsPayload } from './types';
import {
  getConnectionServiceProps,
  getPaymentProductsMappedResponse,
} from './mappers';

export async function getPaymentProductsAppHandler(
  payload: GetPaymentProductsPayload,
) {
  // Todo: will handle the authentication

  // Prepare service payload for get payment status
  const serviceResponse = await getPaymentProducts(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    payload,
  );

  return getPaymentProductsMappedResponse(serviceResponse);
}
