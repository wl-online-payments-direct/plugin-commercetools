import { createClient } from 'redis';

const connect = async () => {
  const cacheClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
  });

  return cacheClient.connect();
};

export default connect;
