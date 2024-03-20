import { Payment } from '../types';
import constants from '../constants';

export function listOrderResponseMapper(orders: { data: Payment[] }) {
  const {
    FRONTEND: { SETTLED_PROCESSING, AWAITING_PAYMENT },
  } = constants;

  const statusMapper: { [key: string]: string } = {
    CAPTURED: SETTLED_PROCESSING,
    AUTHORIZED: AWAITING_PAYMENT,
  };

  const updatedOrders = orders.data.map((order) => {
    const updatedOrder = { ...order };
    updatedOrder.status = statusMapper[updatedOrder.status];
    return updatedOrder;
  });

  return {
    ...orders,
    data: updatedOrders,
  };
}
