import { ServerResponse } from "http";
import { initiatePaymentRequest } from "../../lib";
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from "@worldline/util-integration";
import { Request } from "~/types";

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    const {
      projectId,
      storeId,
      cartId,
      tokens,
      askConsumerConsent = true, // Default will be true
    } = request.body;

    if (!projectId || !storeId || !cartId || !tokens) {
      throw {
        message: "Required parameters are missing or empty",
        statusCode: 400,
      };
    }

    // Perform a test connection request to psp
    const options = { projectId, storeId, cartId, tokens, askConsumerConsent };
    const data = await initiatePaymentRequest(options);

    ResponseClient.setResponseTo200(response, data);
  } catch (error) {
    logger.error(error);
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
