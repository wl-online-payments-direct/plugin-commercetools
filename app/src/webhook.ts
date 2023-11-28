import { getCartById } from '@worldline/ct-integration';
import { setPaymentStatusInReview } from '@worldline/db-integration';
import { WebhookPayload } from './types';

export async function handleWebhook(payload: WebhookPayload) {
  const { amount, merchantReference } = payload;

  // Fetch cart from Commercetools
  const cartId = ''; // TODO:
  const { cart } = await getCartById(cartId);

  if (!cart) {
    throw { message: 'Failed to fetch the cart data', statusCode: 400 };
  }

  // Compare the amounts
  if (amount !== cart.amount) {
    throw {
      message: 'Cart amount doesnt match the webhook amount',
      statusCode: 400,
    };
  }

  // check the state and if error 500 error code

  // send a notification to admin

  // set status as "REVIEW" in the database
  await setPaymentStatusInReview(merchantReference);
}
