import { getCustomObjects, getMyCart } from '@worldline/ctintegration-ct';
import { getPaymentTokensByCustomerID } from '@worldline/ctintegration-db';
import { LoadPaymentMethodsPayload } from './types';
import { loadPaymentMethodsMappedResponse } from './mappers';

export async function loadPaymentMethodsAppHandler(
  payload: LoadPaymentMethodsPayload,
) {
  // Fetch customer cart from Commercetools
  const { cart } = await getMyCart(payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart or cart is empty!',
      statusCode: 500,
    };
  }

  const methods = [];

  if (cart.customerId) {
    const savedTokens = await getPaymentTokensByCustomerID(cart.customerId);
    methods.push(...savedTokens);
  }

  // Fetch custom objects from admin config
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const customConfig = await getCustomObjects(payload.storeId);

  // TODO: Need to fetch the custom objects too and merge in the savedTokens
  return loadPaymentMethodsMappedResponse(methods);
}
