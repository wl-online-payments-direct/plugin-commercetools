import { ServerResponse } from "http";
import { initiatePaymentRequest } from "../../lib";
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from "@worldline/ctintegration-util";
import { Request } from "~/types";

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    const data = await initiatePaymentRequest(request);

    ResponseClient.setResponseTo200(response, data);
  } catch (error) {
    logger.error(error);
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
