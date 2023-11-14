import { ApiClient } from "./clients";
import { convertOrder } from "./mappers/order";

export async function createNewOrder() {
  // Initialize api client
  const apiClient = new ApiClient();
  apiClient.setBody({
    query: "",
    variables: {},
  });
  const result = await apiClient.getData();

  // do mapper
  return convertOrder(result);
}
