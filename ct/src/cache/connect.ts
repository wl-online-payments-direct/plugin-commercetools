import { createClient } from 'redis';

const connect = async () => {
  const cacheClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
  });

  try {
    return await cacheClient.connect();
  } catch (error) {
    throw error;
  }
};

export default connect;
