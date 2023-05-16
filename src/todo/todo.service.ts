import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getTodoById(id: number): Promise<Todo> {
    const todos = await this.getAllTodos();
    const todo = todos.find(t => t.id === id);
    if(!todo) {
      throw new BadRequestException(`Todo with id ${id} not found`);
    };
    return todo;
  };

  async markTodoComplete(id: number): Promise<any> {
    const todos = await this.getAllTodos();
    const todo = todos.find(t => t.id === id);
    const indexOfTodo = todos.indexOf(todo);
    if(!todo) {
      throw new BadRequestException(`Todo with id ${id} not found`);
    } else if(todo.completed) {
      throw Error('Todo is already complete');
    };
    const updatedTodo: Todo = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: true
    };
    todos[indexOfTodo] = updatedTodo;
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return { message: `Todo ${id} completed` };
  };

  async deleteTodoById(id: number): Promise<any> {
    const todos = await this.getAllTodos();
    const newTodos = todos.filter(t => t.id !== id);
    await this.redisService.setAsync('todos', JSON.stringify(newTodos));
    return { message: `Todo with ID: ${id} deleted` };
  };

  async deleteAllTodos(): Promise<any> {
    const todos = []
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return { message: 'All todos removed' };
  };

}
