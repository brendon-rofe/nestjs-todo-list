import { Injectable, OnModuleInit } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: redis.RedisClient;
  public getAsync: (key: string) => Promise<string>;
  public setAsync: (key: string, value: string) => Promise<void>;

  onModuleInit() {
    this.client = redis.createClient({
      url: 'redis://localhost:6379', // your redis url
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
  }

  getClient(): redis.RedisClient {
    return this.client;
  }
}
