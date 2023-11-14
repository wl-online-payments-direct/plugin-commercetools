import { IncomingMessage } from "http";

const isPostRequest = (request: IncomingMessage) => request.method === "POST";
const isGetRequest = (request: IncomingMessage) => request.method === "GET";
const isOptionsRequest = (request: IncomingMessage) =>
  request.method === "OPTIONS";
const isMultiPartRequest = (request: IncomingMessage) =>
  !!request.rawHeaders.find((header) => header.includes("multipart/form-data"));

export { isPostRequest, isGetRequest, isMultiPartRequest, isOptionsRequest };
