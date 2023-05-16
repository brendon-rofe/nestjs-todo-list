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

  @Put('/complete/:id')
  async markTodoComplete(@Param('id') id: string): Promise<any> {
    return await this.todoService.markTodoComplete(Number(id));
  };

  @Put('/update-title/:id')
  async updateTodoTitle(@Param('id') id: string, @Body() update: any): Promise<any> {
    return await this.todoService.updateTodoTitle(Number(id), update);
  };

  @Put('/update-description/:id')
  async updateTodoDescription(@Param('id') id: string, @Body() update: any): Promise<any> {
    return await this.todoService.updateTodoDescription(Number(id), update);
  };

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string): Promise<any> {
    return await this.todoService.deleteTodoById(Number(id));
  };

  @Delete()
  async deleteAllTodos(): Promise<any> {
    return await this.todoService.deleteAllTodos();
  };

}
