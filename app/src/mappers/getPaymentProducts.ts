import { GetPaymentProductsResponse } from '../types';

export function getPaymentProductsMappedResponse(
  serviceResponse: GetPaymentProductsResponse,
) {
  const { paymentProducts = [] } = serviceResponse || {};
  return paymentProducts.map((product) => {
    const { id: paymentProductId, paymentMethod, displayHints } = product;
    return {
      paymentProductId,
      paymentMethod,
      ...displayHints,
    };
  });
}
