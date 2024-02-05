import { GetPaymentProductsResponse } from '../types';

export function getPaymentProductsMappedResponse(
  serviceResponse: GetPaymentProductsResponse,
) {
  const { paymentProducts = [] } = serviceResponse || {};
  return paymentProducts.map((product) => product?.displayHints);
}
