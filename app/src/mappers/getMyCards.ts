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
      pOption,
    ]),
  );

  return cards.map((card) => {
    const { id, paymentProductId, title, token, createdAt: savedAt } = card;
    const {
      paymentMethod = '',
      label = '',
      logo = '',
      defaultLogo = '',
    } = mappedPaymentMethods[paymentProductId] || {};

    return {
      id,
      title,
      token,
      paymentProductId,
      paymentMethod,
      label,
      logo,
      defaultLogo,
      savedAt,
    };
  });
}
