import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Controller('todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  };

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.getTodoById(Number(id));
  }

  @Post()
  async createTodo(@Body() todo: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(todo);
  };

  @Put(':id')
  async markTodoComplete(@Param('id') id: string) {
    return await this.todoService.markTodoComplete(Number(id));
  };

  @Delete()
  async deleteAllTodos(): Promise<any> {
    return await this.todoService.deleteAllTodos();
  };

}
