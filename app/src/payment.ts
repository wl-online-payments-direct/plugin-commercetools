import {
  getCartById,
  getMyCart,
  getCustomObjects,
} from "@worldline/ct-integration";
import {
  hostedTokenizationService,
  createPaymentService,
} from "@worldline/psp-integration";
import { ICreatePayment, initiatePaymentSessionType } from "./types";

export async function initiatePaymentSession({
  authToken,
  projectId,
  storeId,
  cartId,
  tokens,
  askConsumerConsent,
}: initiatePaymentSessionType) {
  try {
    // Fetch cart from Commercetools
    const cart = await getCartById(cartId);

    if (!cart) {
      throw { message: "Failed to fetch the cart data", statusCode: 403 };
    }

    // Will use it later for business logic
    projectId;

    // Fetch variant from admin config
    const customConfig = await getCustomObjects(authToken, storeId);

    const variant = customConfig.variant;

    // Fetch connection options from admin config
    const connectOpts = {
      merchantId: customConfig.merchantId,
      integrator: customConfig.integrator,
      apiKey: customConfig.apiKey,
      apiSecret: customConfig.apiSecret,
      host: customConfig.host,
    };

    //Call hosted tokenization service
    const hostedTokenizationPayload = {
      locale: cart.locale,
      variant,
      tokens,
      askConsumerConsent,
    };

    const result = await hostedTokenizationService(
      connectOpts,
      hostedTokenizationPayload
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export async function createPayment({
  authToken,
  projectId,
  storeId,
}: ICreatePayment) {
  try {
    // Fetch cart from Commercetools
    const { cart, customer } = await getMyCart(authToken);

    if (!cart) {
      throw { message: "Failed to fetch the cart data", statusCode: 400 };
    }

    // Will use it later for business logic
    projectId;

    // Fetch variant from admin config
    const customConfig = await getCustomObjects(authToken, storeId);

    // Fetch connection options from admin config
    const connectOpts = {
      merchantId: customConfig.merchantId,
      integrator: customConfig.integrator,
      apiKey: customConfig.apiKey,
      apiSecret: customConfig.apiSecret,
      host: customConfig.host,
    };

    //Prepare service payload
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
    };

    const result = await createPaymentService(
      connectOpts,
      createPaymentPayload
    );

    return result;
  } catch (error) {
    throw error;
  }
}
