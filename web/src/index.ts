import * as dotenv from 'dotenv';

import { logger } from '@worldline/ctintegration-util';
import { createServer } from './server';

dotenv.config();

const server = createServer();

const port = process.env.PORT || 3000;

server.listen(port, async () => {
  logger().info(`Extension module is running at http://localhost:${port}`);
});
