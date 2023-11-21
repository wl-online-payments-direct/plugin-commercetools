import { ServerResponse } from "http";
import { createPaymentRequest } from "../../lib";
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

    const data = await createPaymentRequest(request);

    ResponseClient.setResponseTo200(response, data);
  } catch (error) {
    logger.error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
