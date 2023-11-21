import { getCartById, getCustomObjects } from "@worldline/ct-integration";
import { hostedTokenizationService } from "@worldline/psp-integration";
import { InitiatePaymentPayload } from "./types";

export async function initiatePaymentSession({
  authToken,
  projectId,
  storeId,
  cartId,
  tokens,
  askConsumerConsent,
}: InitiatePaymentPayload) {
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
