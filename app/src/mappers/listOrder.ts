import { Payment } from '../types';
import constants from '../constants';

export function listOrderResponseMapper(orders: Payment[]) {
  const {
    FRONTEND: { SETTLED_PROCESSING, AWAITING_PAYMENT },
  } = constants;

  const updatedOrders = orders.map((order) => {
    const updatedOrder = { ...order };

    if (updatedOrder.status === 'CAPTURED') {
      updatedOrder.status = SETTLED_PROCESSING;
    } else if (updatedOrder.status === 'AUTHORIZED') {
      updatedOrder.status = AWAITING_PAYMENT;
    }

    return updatedOrder;
  });

  return updatedOrders;
}
