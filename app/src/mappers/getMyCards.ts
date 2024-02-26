import { CustomObjects, CustomerPaymentToken } from '../types';

export function getMyCardsResponseMapper(
  cards: CustomerPaymentToken[],
  customConfig: CustomObjects,
) {
  if (!cards?.length) return [];

  const { redirectModeA = { paymentOptions: [] } } = customConfig || {};

  const mappedPaymentMethods = Object.fromEntries(
    redirectModeA.paymentOptions.map((pOption) => [
      pOption?.paymentProductId,
      pOption?.paymentMethod,
    ]),
  );

  return cards.map((card) => {
    const { id, paymentProductId, title, token, createdAt } = card;
    return {
      id,
      title,
      token,
      paymentProductId,
      paymentMethod: mappedPaymentMethods[card?.paymentProductId] || '',
      createdAt,
    };
  });
}
