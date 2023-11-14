import { ServerResponse } from "http";
import { saveConfig } from "./../../lib/configuration";
import { logger, ResponseClient } from "@worldline/util-integration";
import { Request } from "~/types";

const processRequest = async (
  request: Request,
  response: ServerResponse
) => {
  try {
    const config = await saveConfig(request);

    const responseData = {
      ...config,
    };

    ResponseClient.setResponseTo200(response, responseData);
  } catch (error: any) {
    logger.error(error);
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
