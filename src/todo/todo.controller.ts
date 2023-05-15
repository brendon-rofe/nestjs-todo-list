import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<any[]> {
    return await this.todoService.getAllTodos();
  };

  @Post()
  async createTodo(@Body() todo: any): Promise<any> {
    return await this.todoService.createTodo(todo);
  };

}
