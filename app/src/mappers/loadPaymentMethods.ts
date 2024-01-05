import { CustomerPaymentToken } from '../types';

export function loadPaymentMethodsMappedResponse(
  customerPaymentTokens: CustomerPaymentToken[] | null,
) {
  return customerPaymentTokens && Array.isArray(customerPaymentTokens)
    ? customerPaymentTokens.map((cpt) => ({
        title: cpt?.title || '',
        token: cpt?.token || '',
      }))
    : [];
}
