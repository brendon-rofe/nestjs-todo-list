import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Controller('todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoService.getAll();
  };

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.getById(Number(id));
  }

  @Post(':userId')
  async createTodo(@Param('userId') userId: number ,@Body() todo: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(userId, todo);
  };

  @Put('/complete/:id')
  async markTodoComplete(@Param('id') id: string): Promise<any> {
    return await this.todoService.markComplete(Number(id));
  };

  @Put('/update-title/:id')
  async updateTodoTitle(@Param('id') id: string, @Body() update: any): Promise<any> {
    return await this.todoService.updateTitle(Number(id), update);
  };

  @Put('/update-description/:id')
  async updateTodoDescription(@Param('id') id: string, @Body() update: any): Promise<any> {
    return await this.todoService.updateDescription(Number(id), update);
  };

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string): Promise<any> {
    return await this.todoService.deleteById(Number(id));
  };

  @Delete()
  async deleteAllTodos(): Promise<any> {
    return await this.todoService.deleteAll();
  };

}
