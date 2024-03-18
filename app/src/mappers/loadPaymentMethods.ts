import Constants from '../constants';
import { CustomObjects, CustomerPaymentToken, PaymentMethod } from '../types';
import { camelCase } from './common';

export function loadPaymentMethodsMappedResponse(
  customConfig: CustomObjects,
  customerPaymentTokens: CustomerPaymentToken[] | null,
) {
  const {
    PAYMENT: { REDIRECTMODE_A, REDIRECTMODE_B, ONSITEMODE },
  } = Constants;

  const {
    enableWorldlineCheckout,
    redirectModeA: { enabled = false, paymentOptions = [] } = {},
    redirectModeB,
    onSiteMode,
  } = customConfig || {};

  const mappedPaymentMethods = Object.fromEntries(
    paymentOptions.map((pOption) => [pOption.paymentProductId, pOption]),
  );
  // Create a map with a composite key (customerId-paymentId-token)
  const tokenMap = new Map<string, CustomerPaymentToken>();

  customerPaymentTokens?.forEach((token) => {
    const key = `${token.customerId}-${token.paymentId}-${token.token}`;
    tokenMap.set(key, token);
  });

  // Convert map values back to an array
  const uniqueTokensArray = Array.from(tokenMap.values());
  const tokens =
    uniqueTokensArray && Array.isArray(uniqueTokensArray)
      ? uniqueTokensArray.map((cpt) => {
          const { logo = '' } =
            mappedPaymentMethods[cpt?.paymentProductId] || {};

          return {
            name: cpt?.title || '',
            type: ONSITEMODE.TYPE,
            token: cpt?.token || '',
            paymentMethod: cpt?.title || '',
            image: {
              src: logo,
            },
          };
        })
      : [];

  // Return empty payment methods if checkout is disabled
  if (
    !enableWorldlineCheckout ||
    (!enabled && !redirectModeB.enabled && !onSiteMode.enabled)
  ) {
    return { paymentMethods: [] };
  }

  const paymentMethods: PaymentMethod[] = [];

  Object.values(paymentOptions).forEach((value) => {
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
