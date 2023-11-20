import { IncomingMessage } from "http";

const isPostRequest = (method = "") => method === "POST";

const isGetRequest = (method = "") => method === "GET";

const isOptionsRequest = (method = "") => method === "OPTIONS";

const isMultiPartRequest = (request: IncomingMessage) =>
  !!request.rawHeaders.find((header) => header.includes("multipart/form-data"));

const isGetRequestOrThrowError = async (method = "") => {
  if (!isGetRequest(method)) {
    throw { httpStatusCode: 405, message: "Method not allowed" };
  }
};

const isPostRequestOrThrowError = async (method = "") => {
  if (!isPostRequest(method)) {
    throw { httpStatusCode: 405, message: "Method not allowed" };
  }
};

export {
  isPostRequest,
  isGetRequest,
  isMultiPartRequest,
  isOptionsRequest,
  isGetRequestOrThrowError,
  isPostRequestOrThrowError,
};
