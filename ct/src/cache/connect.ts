import { RedisClientType, createClient } from 'redis';

class CacheClient {
  static _instance: RedisClientType;

  static async getInstance(): Promise<RedisClientType> {
    if (!this._instance) {
      const config = JSON.parse(process.env.REDIS_CONNECTION_CONFIG || '{}');
      const cacheClient = createClient(config) as RedisClientType;
      this._instance = await cacheClient.connect();
    }
    return this._instance;
  }
}

export default CacheClient;
