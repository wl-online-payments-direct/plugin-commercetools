import { getDBOrders } from '@worldline/ctintegration-db';
import { ListOrdersPayload } from './types';
import constants from './constants';

export async function getListOrders(payload: ListOrdersPayload) {
  const paymentOptions = constants.getPaymentOptions();
  if (payload.filterOption) {
    if (!paymentOptions.includes(payload.filterOption)) {
      throw { statusCode: 400, message: 'Invalid filter option' };
    }
  }

  return getDBOrders(payload);
}
