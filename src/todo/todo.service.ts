import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Injectable()
export class TodoService {
  public nextTodoId: number = 1;

  constructor(private readonly redisService: RedisService) {}

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.redisService.getAsync('todos');
    return todos ? JSON.parse(todos) : [];
  };

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const todos = await this.getAllTodos();
    const newTodo = {
      id: this.nextTodoId,
      ...todo
    };
    todos.push(newTodo);
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return(newTodo);
  };

}
