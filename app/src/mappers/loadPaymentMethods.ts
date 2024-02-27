import Constants from '../constants';
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
  const {
    PAYMENT: { REDIRECTMODE_A, REDIRECTMODE_B, ONSITEMODE },
  } = Constants;

  Object.values(redirectModeA.paymentOptions).forEach((value) => {
    if (value && value?.enabled) {
      paymentMethods.push({
        name: value.label,
        paymentProductId: value.paymentProductId,
        displayOrder: value.displayOrder,
        type: REDIRECTMODE_A.TYPE,
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
      type: REDIRECTMODE_B.TYPE,
      image: {
        src: redirectModeB?.logo || '',
      },
      enabled: redirectModeB?.enabled,
      paymentMethod: REDIRECTMODE_B.PAYMENT_METHOD,
    });
  }

  if (onSiteMode?.enabled) {
    paymentMethods.push({
      name: onSiteMode?.payButtonTitle || '',
      type: ONSITEMODE.TYPE,
      image: {
        src: onSiteMode?.logo || '',
      },
      enabled: onSiteMode?.enabled,
      paymentMethod: ONSITEMODE.PAYMENT_METHOD,
    });
  }

  return {
    paymentMethods: [...tokens, ...paymentMethods],
  };
}
