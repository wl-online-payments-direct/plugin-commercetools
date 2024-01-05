import { getMyCart } from '@worldline/ctintegration-ct';
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

  if (!cart.customerId) {
    throw {
      message: 'Failed to identify the customer information',
      statusCode: 500,
    };
  }

  const paymentTokens = await getPaymentTokensByCustomerID(cart.customerId);

  // Need to fetch the custom objects too and merge in the paymentTokens
  return loadPaymentMethodsMappedResponse(paymentTokens);
}
