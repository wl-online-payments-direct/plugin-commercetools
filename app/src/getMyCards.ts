import { getPaymentTokensByCustomerID } from '@worldline/ctintegration-db';
import { getCustomObjects, getMyCart } from '@worldline/ctintegration-ct';
import { MyCardsAppPayload } from './types';
import { getMyCardsResponseMapper } from './mappers';

export async function getMyCardsAppHandler(payload: MyCardsAppPayload) {
  // Fetch customer from Commercetools to authenticate
  const { customer } = await getMyCart(payload.authToken);

  if (!customer) {
    throw {
      message: 'Failed to fetch the customer or customer is missing',
      statusCode: 500,
    };
  }

  const customConfig = await getCustomObjects(payload.storeId);

  // Invoke db to get customer saved cards
  const myCards = await getPaymentTokensByCustomerID(customer?.id);

  return getMyCardsResponseMapper(myCards, customConfig);
}
