import http, { ServerResponse } from 'http';
import url from 'url';
import { StatusCodes } from 'http-status-codes';
import {
  cors,
  logger,
  ResponseClient,
  isOptionsRequest,
  isPostRequest,
  isMultiPartRequest,
} from '@worldline/ctintegration-util';
import { routes } from '../router';
import { Request } from '../lib/types';

const createServer = () =>
  http.createServer(async (request: Request, response: ServerResponse) => {
    try {
      const requestUrl = request.url || '/';
      const parts = url.parse(requestUrl);
      const route = routes[parts.pathname as keyof typeof routes];

      const { method } = request;

      if (route) {
        if (isOptionsRequest(method)) {
          response.writeHead(204, cors());
          response.end();
          return;
        }
        if (isPostRequest(method) && !isMultiPartRequest(request)) {
          let chunks = '';
          request.on('data', (chunk) => {
            chunks += chunk;
          });
          request.on('end', async () => {
            try {
              request.body = JSON.parse(chunks);
            } catch (err) {
              request.body = {};
            }
            await route(request, response);
          });
        } else {
          await route(request, response);
        }
      } else {
        ResponseClient.setResponseError(response, {
          statusCode: StatusCodes.NOT_FOUND,
          message: 'Route not found',
        });
      }
    } catch (e) {
      logger().debug(
        JSON.stringify(e),
        `Unexpected error when processing URL ${request.url}`,
      );
      ResponseClient.setResponseError(response, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: (e as { message: string }).message,
      });
    }
  });

export { createServer };
