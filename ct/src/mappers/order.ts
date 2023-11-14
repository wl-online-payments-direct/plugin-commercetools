import { Order } from "~/types/order";

export function convertOrder(data: unknown) {
    const order = data as Order
    return {
        orderId: order.data.id
    }
}