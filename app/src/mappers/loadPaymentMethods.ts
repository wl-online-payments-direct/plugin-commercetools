import { CustomObjects, CustomerPaymentToken } from '../types';

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

  const { paymentMethods = [] } = customConfig || {};

  return {
    tokens,
    paymentMethods,
  };
}
