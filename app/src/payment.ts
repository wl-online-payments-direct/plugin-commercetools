import { getCartById } from "@worldline/ct-integration";
import { hostedTokenizationService } from "@worldline/psp-integration";
import { InitiatePaymentSessionPayload } from "./types";

export async function initiatePaymentSession({
  projectId,
  storeId,
  cartId,
  tokens,
  askConsumerConsent,
}: InitiatePaymentSessionPayload) {
  try {
    // Fetch cart from Commercetools
    const cart = await getCartById(cartId);

    if (!cart) {
      throw { message: "Failed to fetch the cart data", statusCode: 403 };
    }

    // Will use it for business logic
    projectId;
    storeId;

    //Todo:
    // Fetch variant from admin config
    const variant = "";

    //Todo:
    // Fetch connection options from admin config
    const connectOpts = {
      merchantId: "",
      integrator: "",
      apiKey: "",
      apiSecret: "",
      host: "",
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
