import { IncomingMessage } from 'http';

interface Request extends IncomingMessage {
  body?: unknown;
}

export { Request };
