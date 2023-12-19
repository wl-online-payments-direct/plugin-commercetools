import { createClient } from 'redis';

const connect = async () => {
  const config = JSON.parse(process.env.REDIS_CONNECTION_CONFIG || '{}');
  const cacheClient = createClient(config);
  return cacheClient.connect();
};

export default connect;
