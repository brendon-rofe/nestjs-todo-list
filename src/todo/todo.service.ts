import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Injectable()
export class TodoService {
  constructor(private readonly redisService: RedisService) {}

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.redisService.getAsync('todos');
    return todos ? JSON.parse(todos) : [];
  };

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const todos = await this.getAllTodos();
    const newTodo: Todo = {
      id: (await this.getAllTodos()).length + 1,
      title: todo.title,
      description: todo.description,
      completed: false
    };
    todos.push(newTodo);
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return(newTodo);
  };

  async getTodoById(id: number): Promise<Todo | any> {
    const todos = await this.getAllTodos();
    const todo = todos.find(t => t.id === id);
    if(!todo) {
      return { message: 'No todo with that ID found' };
    }
    return todo;
  }

}
