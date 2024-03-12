import { getCustomObjects, getCart } from '@worldline/ctintegration-ct';
import {
  getPaymentTokensByCustomerID,
  getPaymentsByIds,
} from '@worldline/ctintegration-db';
import {
  LoadPaymentMethodsCustomerPaymentToken,
  LoadPaymentMethodsPayload,
} from './types';
import { loadPaymentMethodsMappedResponse } from './mappers';

export async function loadPaymentMethodsAppHandler(
  payload: LoadPaymentMethodsPayload,
) {
  // Fetch customer cart from Commercetools using frontastic token
  const { cart } = await getCart(payload.cartId, payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart or cart is empty!',
      statusCode: 500,
    };
  }

  let savedTokens: LoadPaymentMethodsCustomerPaymentToken[] = [];
  if (cart.customerId) {
    savedTokens = await getPaymentTokensByCustomerID(cart.customerId);
  }
  const paymentIds: string[] = Array.from(
    new Set(savedTokens.map((token) => token.paymentId)),
  );
  const dbPayments = await getPaymentsByIds(paymentIds);
  // Fetch custom objects
  const customConfig = await getCustomObjects(payload.storeId);

  return loadPaymentMethodsMappedResponse(
    customConfig,
    savedTokens,
    dbPayments,
  );
}
