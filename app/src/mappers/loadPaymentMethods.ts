import Constants from '../constants';
import {
  CustomObjects,
  CustomerPaymentToken,
  Payment,
  PaymentMethod,
} from '../types';
import { camelCase } from './common';

export function loadPaymentMethodsMappedResponse(
  customConfig: CustomObjects,
  customerPaymentTokens: CustomerPaymentToken[] | null,
  dbPayments?: Payment[],
) {
  const {
    PAYMENT: {
      REDIRECTMODE_A,
      REDIRECTMODE_B,
      ONSITEMODE,
      DATABASE: { PAYMENT_OPTIONS },
    },
  } = Constants;

  const {
    enableWorldlineCheckout,
    redirectModeA = { paymentOptions: [] },
    redirectModeB,
    onSiteMode,
  } = customConfig || {};

  const mappedPaymentMethods = Object.fromEntries(
    redirectModeA.paymentOptions.map((pOption) => [
      pOption.paymentProductId,
      pOption.paymentMethod,
    ]),
  );

  const tokens =
    customerPaymentTokens && Array.isArray(customerPaymentTokens)
      ? customerPaymentTokens.map((cpt) => {
          const payment = dbPayments?.find(
            (dbPayment) => dbPayment.paymentId === cpt.paymentId,
          );

          // Determine the type based on the existence of dbPayment and its paymentOption
          const type =
            payment &&
            payment.paymentOption === PAYMENT_OPTIONS.WORLDLINE_CREDITCARD
              ? ONSITEMODE.TYPE
              : REDIRECTMODE_A.TYPE;

          return {
            name: cpt?.title || '',
            type,
            token: cpt?.token || '',
            paymentMethod: mappedPaymentMethods[cpt?.paymentProductId],
          };
        })
      : [];

  // Return empty payment methods if checkout is disabled
  if (!enableWorldlineCheckout) {
    return { paymentMethods: [] };
  }

  const paymentMethods: PaymentMethod[] = [];

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
