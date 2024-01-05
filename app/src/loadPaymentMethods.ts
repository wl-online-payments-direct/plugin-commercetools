import { getCustomObjects, getMyCart } from '@worldline/ctintegration-ct';
import { getPaymentTokensByCustomerID } from '@worldline/ctintegration-db';
import { CustomerPaymentToken, LoadPaymentMethodsPayload } from './types';
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

  let savedTokens: CustomerPaymentToken[] = [];
  if (cart.customerId) {
    savedTokens = await getPaymentTokensByCustomerID(cart.customerId);
  }

  // Fetch custom objects
  const customConfig = await getCustomObjects(payload.storeId);

  return loadPaymentMethodsMappedResponse(customConfig, savedTokens);
}
