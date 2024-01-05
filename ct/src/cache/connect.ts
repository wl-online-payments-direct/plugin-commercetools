import { logger } from '@worldline/ctintegration-util';

import { RedisClientType, createClient } from 'redis';

class CacheClient {
  static _instance: RedisClientType;

  static async getInstance(): Promise<RedisClientType> {
    if (!this._instance) {
      const config = JSON.parse(process.env.REDIS_CONNECTION_CONFIG || '{}');
      if (!Object.keys(config).length) {
        logger().warn('Failed to establish a cache client connection!');
      }
      const cacheClient = createClient(config) as RedisClientType;
      this._instance = await cacheClient.connect();
    }
    return this._instance;
  }
}

export default CacheClient;
