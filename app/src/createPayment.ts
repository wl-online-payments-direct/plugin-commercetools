import { getMyCart, getCustomObjects } from '@worldline/ct-integration';
import { createPaymentService } from '@worldline/psp-integration';
import {
  createPaymentInDB,
  getIncrementedPaymentId,
} from '@worldline/db-integration';
import { CreatePaymentPayload } from './types';
import { createPaymentMapper } from './mappers';

export async function createPayment({
  authToken,
  projectId,
  storeId,
  hostedTokenizationId,
}: CreatePaymentPayload) {
  // Fetch cart from Commercetools
  const { cart, customer } = await getMyCart(authToken);

  if (!cart) {
    throw { message: 'Failed to fetch the cart data', statusCode: 400 };
  }

  // TODO:Will use it later for business logic
  // eslint-disable-next-line no-unused-expressions
  projectId;

  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(authToken, storeId);

  if (!customConfig) {
    throw { message: 'Failed to fetch the custom object', statusCode: 400 };
  }

  // Prepare payload for the service connection
  const connectOpts = {
    merchantId: customConfig.merchantId,
    integrator: customConfig.integrator,
    apiKey: customConfig.apiKey,
    apiSecret: customConfig.apiSecret,
    host: customConfig.host,
  };

  // Prepare service payload for create payment
  const createPaymentPayload = {
    order: {
      customer: {
        merchantCustomerId: cart.customerId || customer.id,
      },
      amountOfMoney: {
        amount: cart.taxedPrice.totalGross.centAmount,
        currencyCode: cart.taxedPrice.totalGross.currencyCode,
      },
    },
    hostedTokenizationId,
  };

  const paymentServiceResponse = await createPaymentService(
    connectOpts,
    createPaymentPayload
  );

  const { merchantReference } = customConfig;
  const { incrementedPaymentId } = await getIncrementedPaymentId();
  const paymentId = `${merchantReference}-${incrementedPaymentId}`;

  // save the payment information to database
  const createPaymenDBResponse = await createPaymentInDB({
    paymentId, // generate a pattern
    worldlineId: paymentServiceResponse.id.toString(),
    storeId,
    cartId: cart.id,
    orderId: '',
  });

  return createPaymentMapper(createPaymenDBResponse);

}
