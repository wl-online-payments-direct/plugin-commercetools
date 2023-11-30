import {
  createOrder,
  createPayment,
  getCartById,
  getAccessToken,
} from '@worldline/ct-integration';
import { getPayment, setPayment } from '@worldline/db-integration';
import { WebhookPayload } from './types';

export async function handleWebhook(payload: WebhookPayload) {
  const { amount, merchantReference } = payload;

  // Get payment respected for merchantReference
  const { cartId, state } = await getPayment({
    paymentId: merchantReference,
  });

  // Fetch cart from Commercetools
  const cart = await getCartById(cartId);

  // Compare the amounts
  if (amount !== cart.taxedPrice?.totalGross.centAmount) {
    // TODO: send a notification to admin
    throw {
      message: 'Cart amount doesnt match the webhook amount',
      statusCode: 500,
    };
  }

  // Verify the payment state
  if (state === 'PROCESSING') {
    throw {
      message: `Failed to process the payment as state is ${state}`,
      statusCode: 500,
    };
  }

  // set status as "REVIEW" in the database
  await setPayment(
    {
      paymentId: merchantReference,
    },
    {
      status: 'REVIEW',
    },
  );

  // Get access token
  const token = await getAccessToken();

  console.log('token', token);

  await createOrder(token.access_token, cartId);
  // await createPayment();
}
