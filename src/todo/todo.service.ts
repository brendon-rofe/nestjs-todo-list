import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Injectable()
export class TodoService {
  constructor(private readonly redisService: RedisService) {}

  async create(userId: string, todo: CreateTodoDto): Promise<Todo> {
    const todos = await this.getAllUserTodos(userId);
    const newTodo: Todo = {
      id: todos.length + 1,
      title: todo.title,
      description: todo.description,
      completed: false
    };
    todos.push(newTodo);
    await this.redisService.setAsync('todos:${userId}', JSON.stringify(todos));
    return(newTodo);
  };

  async getAllUserTodos(userId: string): Promise<Todo[]> {
    const todos = await this.redisService.getAsync('todos:${userId}');
    return todos ? JSON.parse(todos) : [];
  };

  async getById(userId: string, id: number): Promise<Todo> {
    const todos = await this.getAllUserTodos(userId);
    const todo = todos.find(t => t.id === id);
    if(!todo) {
      throw new BadRequestException(`Todo with id ${id} not found`);
    };
    return todo;
  };

  async markComplete(userId: string, id: number): Promise<any> {
    const todos = await this.getAllUserTodos(userId);
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

  async updateTitle(userId: string, id: number, update: any): Promise<any> {
    const todos = await this.getAllUserTodos(userId);
    const todo = todos.find(t => t.id === id);
    const indexOfTodo = todos.indexOf(todo);
    if(!todo) {
      return { Error: `Todo with ID: ${id} not found` };
    };
    const updatedTodo: Todo = {
      id: todo.id,
      title: update.newTitle,
      description: todo.description,
      completed: todo.completed
    };
    todos[indexOfTodo] = updatedTodo;
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return await { message: `Todo ${id}'s new title: ${update.newTitle}` };
  };

  async updateDescription(userId: string, id: number, update: any): Promise<any> {
    const todos = await this.getAllUserTodos(userId);
    const todo = todos.find(t => t.id === id);
    const indexOfTodo = todos.indexOf(todo);
    if(!todo) {
      return { Error: `Todo with ID: ${id} not found` };
    };
    const updatedTodo: Todo = {
      id: todo.id,
      title: todo.title,
      description: update.newDescription,
      completed: todo.completed
    };
    todos[indexOfTodo] = updatedTodo;
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return await { message: `Todo ${id}'s new description: ${update.newDescription}` };
  };

  async deleteById(userId: string, id: number): Promise<any> {
    const todos = await this.getAllUserTodos(userId);
    const newTodos = todos.filter(t => t.id !== id);
    await this.redisService.setAsync('todos', JSON.stringify(newTodos));
    return { message: `Todo with ID: ${id} deleted` };
  };

  async deleteAll(): Promise<any> {
    const todos = []
    await this.redisService.setAsync('todos', JSON.stringify(todos));
    return { message: 'All todos removed' };
  };

}
