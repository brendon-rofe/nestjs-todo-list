import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TodoService {

  constructor(private readonly redisService: RedisService) {}

  async getAllTodos(): Promise<any[]> {
    const todos = await this.redisService.getAsync('todos');
    return todos ? JSON.parse(todos) : [];
  };

  async createTodo(todo: any): Promise<any> {
    const todos = await this.getAllTodos();
    todos.push(todo);
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return(todo);
  };

}
