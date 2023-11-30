import { ApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';
import { ICart } from './types';

export async function getCartById(cartId: string) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables = {
    cartId,
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as ICart;

  const cart = mapper(response);

  if (!cart) {
    throw { message: 'Failed to fetch the cart data', statusCode: 400 };
  }

  return cart;
}
