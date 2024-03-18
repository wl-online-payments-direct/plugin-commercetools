import { downloadLogHandler } from '@worldline/ctintegration-app';
import { ServerResponse } from 'http';
import path from 'path';
import { Request } from './types';

export async function downloadLog(_request: Request, response: ServerResponse) {
  const logPath = decodeURIComponent(
    path.join(path.resolve(__dirname, `../../${process.env.LOG_ALL_FILEPATH}`)),
  );
  return downloadLogHandler(response, logPath);
}
