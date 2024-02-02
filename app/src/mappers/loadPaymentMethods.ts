import { CustomObjects, CustomerPaymentToken, PaymentMethod } from '../types';
import { camelCase } from './common';

export function loadPaymentMethodsMappedResponse(
  customConfig: CustomObjects,
  customerPaymentTokens: CustomerPaymentToken[] | null,
) {
  const tokens =
    customerPaymentTokens && Array.isArray(customerPaymentTokens)
      ? customerPaymentTokens.map((cpt) => ({
          title: cpt?.title || '',
          token: cpt?.token || '',
        }))
      : [];

  const {
    redirectModeA = { paymentOptions: [] },
    redirectModeB,
    onSiteMode,
  } = customConfig || {};

  const paymentMethods: PaymentMethod[] = [];

  Object.values(redirectModeA.paymentOptions).forEach((value) => {
    paymentMethods.push({
      name: value.label,
      displayOrder: value.displayOrder,
      type: 'offsite',
      image: {
        src: value.logo,
      },
      enabled: value?.enabled,
      paymentMethod: camelCase(value.label),
    });
  });

  paymentMethods.push({
    name: redirectModeB?.payButtonTitle || '',
    type: 'offsite',
    image: {
      src: redirectModeB?.logo || '',
    },
    enabled: redirectModeB?.enabled || false,
    paymentMethod: 'worldlineOffsite',
  });

  paymentMethods.push({
    name: onSiteMode?.payButtonTitle || '',
    type: 'onsite',
    image: {
      src: onSiteMode?.logo || '',
    },
    enabled: onSiteMode?.enabled || false,
    paymentMethod: 'worldlineOnsite',
  });

  return {
    paymentMethods: [...tokens, ...paymentMethods],
  };
}
