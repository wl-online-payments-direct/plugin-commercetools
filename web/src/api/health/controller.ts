import { IncomingMessage, ServerResponse } from "http";

const processRequest = (
  _request: IncomingMessage,
  response: ServerResponse
) => {
  response.end("ok");
};

export default { processRequest };
