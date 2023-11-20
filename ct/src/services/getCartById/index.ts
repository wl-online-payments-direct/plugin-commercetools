import { ApiClient } from "./../../clients";
import query from "./query";
import mapper from "./mapper";

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

  const result = await apiClient.execute();

  return mapper(result);
}
