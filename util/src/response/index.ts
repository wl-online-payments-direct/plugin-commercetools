import { ServerResponse } from "http";
import { cors } from "./../headers";

const StatusCodes = {
  OK: 200,
  CREATED: 201,
};

class ResponseManager {
  headers = {
    "Content-Type": "application/json",
  };

  constructor() {}

  setResponseTo200<T>(response: ServerResponse, params?: T) {
    response.writeHead(StatusCodes.OK, {
      ...this.headers,
      ...cors(),
    });
    response.end(
      JSON.stringify({
        statusCode: StatusCodes.OK,
        result: params,
      })
    );
  }

  setResponseTo201<T>(response: ServerResponse, params?: T) {
    response.writeHead(StatusCodes.CREATED, {
      ...this.headers,
      ...cors(),
    });
    response.end(
      JSON.stringify({
        statusCode: StatusCodes.CREATED,
        result: params,
      })
    );
  }

  setResponseError(response: ServerResponse, error: any) {
    const { statusCode = 500, message, details = undefined } = error;
    response.writeHead(statusCode, {
      ...this.headers,
      ...cors(),
    });

    response.end(
      JSON.stringify({
        status: "nok",
        statusCode,
        message,
        details,
      })
    );
  }

  setResponseToEmpty(response: ServerResponse) {
    response.writeHead(StatusCodes.OK, {
      ...this.headers,
      ...cors(),
    });
    response.end();
  }

  setResponse<T>(response: ServerResponse, params?: T) {
    response.writeHead(StatusCodes.OK, {
      ...this.headers,
      ...cors(),
    });
    response.end(JSON.stringify(params));
  }
}

const ResponseClient = new ResponseManager();

export { ResponseClient };
