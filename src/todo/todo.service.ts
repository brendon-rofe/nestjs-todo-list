import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TodoService {

  constructor(private readonly redisService: RedisService) {}

  async getAllTodos(): Promise<any[]> {
    const todos = await this.redisService.getAsync('todos');
    return todos ? JSON.parse(todos) : [];
  };

}
