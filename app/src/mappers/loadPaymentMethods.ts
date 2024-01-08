import { CustomObjects, CustomerPaymentToken } from '../types';

export function pick<Data extends object, Keys extends keyof Data>(
  data: Data,
  keys: Keys[],
): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>;

  keys.forEach((key) => {
    result[key] = data[key];
  });

  return result;
}

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
