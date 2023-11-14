import { getOrderMapper } from "./mappers/order";

export async function getOrder() {
  const data = {};
  return getOrderMapper(data);
}
