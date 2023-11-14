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

  setResponseError(
    response: ServerResponse,
    params: {
      httpStatusCode: number;
      message?: string;
      error?: any;
    }
  ) {
    const { httpStatusCode, message, error } = params;
    response.writeHead(httpStatusCode, {
      ...this.headers,
      ...cors(),
    });

    const errors = {
      httpStatusCode: error.statusCode || 500,
      errors: [
        {
          code: error.statusCode || 500,
          message: error?.response?.body?.message || error.message,
        },
      ],
    };
    response.end(
      JSON.stringify({
        status: "nok",
        message,
        errors,
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
