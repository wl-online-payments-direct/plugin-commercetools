/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingMessage } from 'http';

interface Request extends IncomingMessage {
  body?: unknown;
}

export { Request };
