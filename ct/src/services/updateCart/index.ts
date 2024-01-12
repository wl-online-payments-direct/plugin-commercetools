import { ApiClient } from '../../clients';
import query from './query';
import { updateCartResponseMapper } from '../../mappers';
import { UpdateCart } from '../../types';

export async function updateCart({
  id, // cart id
  version, // cart version
  paymentId,
}: {
  id: string;
  paymentId: string;
  version: number;
}) {
  const apiClient = new ApiClient();
  apiClient.setBody({
    query,
    variables: {
      id,
      version,
      paymentId,
    },
  });
  const result = (await apiClient.execute()) as UpdateCart;

  return updateCartResponseMapper(result);
}
