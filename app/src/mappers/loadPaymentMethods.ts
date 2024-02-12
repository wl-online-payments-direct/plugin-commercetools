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
    enableWorldlineCheckout,
    redirectModeA = { paymentOptions: [] },
    redirectModeB,
    onSiteMode,
  } = customConfig || {};

  // Return empty payment methods if checkout is disabled
  if (!enableWorldlineCheckout) {
    return { paymentMethods: [] };
  }

  const paymentMethods: PaymentMethod[] = [];

  Object.values(redirectModeA.paymentOptions).forEach((value) => {
    if (value && value?.enabled) {
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
    }
  });

  if (redirectModeB?.enabled) {
    paymentMethods.push({
      name: redirectModeB?.payButtonTitle || '',
      type: 'offsite',
      image: {
        src: redirectModeB?.logo || '',
      },
      enabled: redirectModeB?.enabled,
      paymentMethod: 'worldlineOffsite',
    });
  }

  if (onSiteMode?.enabled) {
    paymentMethods.push({
      name: onSiteMode?.payButtonTitle || '',
      type: 'onsite',
      image: {
        src: onSiteMode?.logo || '',
      },
      enabled: onSiteMode?.enabled,
      paymentMethod: 'worldlineOnsite',
    });
  }

  return {
    paymentMethods: [...tokens, ...paymentMethods],
  };
}
