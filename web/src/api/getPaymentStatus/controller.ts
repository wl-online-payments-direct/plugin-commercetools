import { ServerResponse } from "http";
import { getPaymentStatusRequest } from "../../lib";
import {
  isGetRequestOrThrowError,
  logger,
  ResponseClient,
} from "@worldline/util-integration";
import { Request } from "~/types";

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;

    // Only allow GET request; else throw error
    await isGetRequestOrThrowError(method);

    const data = await getPaymentStatusRequest(request);

    ResponseClient.setResponseTo200(response, data);
  } catch (error) {
    logger.error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
