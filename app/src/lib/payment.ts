import {
  Cart,
  Order,
  Payment,
  createOrder,
  createPayment,
  getCartById,
  getClientCredentialsToken,
  getOrderById,
  updateCart,
  updatePayment,
} from '@worldline/ctintegration-ct';
import {
  getPayment,
  saveCustomerPaymentToken,
  setPayment,
} from '@worldline/ctintegration-db';
import { retry } from '@worldline/ctintegration-util';
import { PaymentPayload } from '../types';
import {
  getPaymentDBPayload,
  getPaymentFilterQuery,
  getCreateOrderCTPayload,
  getCreatePaymentCTPayload,
  getUpdateCartPayload,
  getMappedStatus,
  hasEqualAmounts,
  isPaymentProcessing,
  shouldSaveToken,
  getCustomerTokenPayload,
} from '../mappers';

export const resolveOrderPayment = (order: Order): Payment => {
  const payments = (order?.paymentInfo?.payments || []) as unknown as Payment[];
  const sortedPayments = payments.sort(
    (a, b) =>
      new Date(b.lastModifiedAt).getTime() -
      new Date(a.lastModifiedAt).getTime(),
  );
  const [payment] = sortedPayments;
  // return last modified payment
  return payment;
};

const createOrderWithPayment = async (cart: Cart) => {
  // Create order and payment
  const ctPayment = await createPayment(getCreatePaymentCTPayload(cart));

  // Mutate cart for add payment
  const { hasErrDueConcurrentModification, updatedCart } = await updateCart(
    getUpdateCartPayload(cart, ctPayment),
  );

  if (hasErrDueConcurrentModification) {
    return { isRetry: true };
  }

  // Get access token
  const token = await getClientCredentialsToken();

  const ctOrder = await createOrder(
    getCreateOrderCTPayload(updatedCart, token),
  );

  return { isRetry: false, data: { order: ctOrder } };
};

const updateOrderWithPayment = async (
  orderId: string,
  payload: PaymentPayload,
) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw {
      message: `Failed to fetch the order with id '${orderId}'`,
      statusCode: 500,
    };
  }

  const payment = resolveOrderPayment(order);

  // Mutate cart for update payment
  const { hasErrDueConcurrentModification, updatedOrder } = await updatePayment(
    order,
    payment,
    payload,
  );

  if (hasErrDueConcurrentModification) {
    return { isRetry: true };
  }

  return { isRetry: false, data: { order: updatedOrder } };
};

export async function orderPaymentHandler(payload: PaymentPayload) {
  // Fetch DB payment
  const payment = await getPayment(getPaymentDBPayload(payload));
  if (!payment) {
    throw {
      message: `Failed to fetch the payment with merchant reference '${payload.payment.paymentOutput.references.merchantReference}'`,
      statusCode: 500,
    };
  }

  // Fetch CT cart
  const cart = await getCartById(payment.cartId);
  if (!cart) {
    await setPayment({ id: payment.id }, { status: 'IN_REVIEW' });
    // TODO: store the error message in database.
    throw {
      message: `Cart '${payment.cartId}' is missing!`,
      statusCode: 500,
    };
  }

  if (hasEqualAmounts(payload, cart)) {
    // TODO: send a notification to admin and add a column to save the reason
    throw {
      message: 'Cart amount doesnt match with the paid amount',
      statusCode: 500,
    };
  }

  if (isPaymentProcessing(payment.state)) {
    throw {
      message: `Failed to process the payment as it is already in '${payment.state}' state!`,
      statusCode: 500,
    };
  }

  const mappedStatus = getMappedStatus(payload);
  return retry(async () => {
    try {
      if (mappedStatus === 'FAILED') {
        await setPayment({ id: payment.id }, { status: mappedStatus });
        return {
          isRetry: false,
          data: {
            message: `Updated payment status as ${mappedStatus} as we received status as ${payload.payment.status}`,
          },
        };
      }

      await setPayment(
        { id: payment.id },
        { status: mappedStatus, state: 'PROCESSING' },
      );

      let result;
      // if order id exists
      if (payment.orderId) {
        // update order and payment
        result = await updateOrderWithPayment(payment.orderId, payload);
      } else {
        // create order and payment
        result = await createOrderWithPayment(cart);
      }
      // update order id and reset the state as DEFAULT
      await setPayment(getPaymentFilterQuery(payment), {
        ...(!payment.orderId && result?.data?.order?.id
          ? { orderId: result.data.order.id }
          : {}),
        state: 'DEFAULT',
      });

      //  Should save the token only:
      //  if "storePermanently" field is received as true
      //  and cart has a logged in customer
      if (shouldSaveToken(result, cart, payment)) {
        await saveCustomerPaymentToken(
          getCustomerTokenPayload(cart, payment, payload),
        );
      }

      return result;
    } catch (error) {
      // If any exception happens, reset to default state
      await setPayment(getPaymentFilterQuery(payment), {
        state: 'DEFAULT',
      });
      throw error;
    }
  });
}
