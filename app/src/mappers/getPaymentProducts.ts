import { GetPaymentProductsResponse } from '../types';

export function getPaymentProductsMappedResponse(
  serviceResponse: GetPaymentProductsResponse,
) {
  const { paymentProducts = [] } = serviceResponse || {};
  return paymentProducts.map((product) => {
    const {
      id: paymentProductId,
      paymentMethod,
      paymentProductGroup = null,
      displayHints,
    } = product;
    return {
      paymentProductId,
      paymentMethod,
      paymentProductGroup,
      ...displayHints,
    };
  });
}
