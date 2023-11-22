import * as dotenv from 'dotenv';

import { createServer } from './server';

dotenv.config();

const server = createServer();

server.listen(3000, async () => {
  console.log('Extension module is running at http://localhost:3000');
});
