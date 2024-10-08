import http, { ServerResponse } from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import {
  cors,
  logger,
  ResponseClient,
  isOptionsRequest,
  isPostRequest,
  isGetRequest,
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
      const filePath = decodeURIComponent(
        path.join(path.resolve('/'), parts.pathname as string),
      );
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
      } else if (
        isGetRequest(method) &&
        filePath.includes(
          (process.env.DIR_IMAGE_UPLOAD as string) || 'uploadedImages',
        )
      ) {
        const fullPath = path.resolve(filePath);
        const rootDir = path.parse(fullPath).root;
        logger().info(`fullPath: ${fullPath} rootDir: ${rootDir}`);
        const content = await fs.promises.readFile(filePath);
        let contentType = 'application/octet-stream';
        if (filePath.endsWith('.svg')) {
          contentType = 'image/svg+xml';
        } else if (
          ['.jpg', '.jpeg', '.png', '.gif'].some((ext) =>
            filePath.toLowerCase().endsWith(ext),
          )
        ) {
          contentType = `image/${path.extname(filePath).slice(1)}`;
        }
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content);
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
