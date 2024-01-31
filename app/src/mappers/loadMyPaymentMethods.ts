import {
  CustomObjects,
  CustomerPaymentToken,
  MappedRedirectModeA,
} from '../types';
import { camelCase } from './common';

export function loadMyPaymentMethodsMappedResponse(
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

  const { redirectModeA_payOptionUpdate = {} } = customConfig || {};

  const mappedRedirectModeA: MappedRedirectModeA[] = [];

  Object.values(redirectModeA_payOptionUpdate).forEach((value) => {
    mappedRedirectModeA.push({
      name: value.label,
      type: 'offsite',
      image: {
        src: value.logo,
      },
      enabled: value.enabled,
      paymentMethod: camelCase(value.label),
    });
  });

  return {
    paymentMethods: [...tokens, ...mappedRedirectModeA],
  };
}
