import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Controller('todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  async createTodo(@Param('userId') userId: string ,@Body() todo: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(Number(userId), todo);
  };

  @Get(':userId')
  async getAllUserTodos(@Param('userId') userId: string): Promise<Todo[]> {
    return await this.todoService.getAllUserTodos(Number(userId));
  };

  @Get(':userId/:id')
  async getTodoById(@Param('userId') userId: string, @Param('id') id: string): Promise<Todo> {
    return await this.todoService.getById(Number(userId), Number(id));
  };

  @Put('/complete/:userId/:id')
  async markTodoComplete(@Param('userId') userId: string, @Param('id') id: string): Promise<any> {
    return await this.todoService.markComplete(Number(userId), Number(id));
  };

  @Put('/update-title/:userId/:id')
  async updateTodoTitle(@Param('userId') userId: string, @Param('id') id: string, @Body() update: any): Promise<any> {
    return await this.todoService.updateTitle(Number(userId), Number(id), update);
  };

  @Put('/update-description/:userId/:id')
  async updateTodoDescription(@Param('userId') userId: string, @Param('id') id: string, @Body() update: any): Promise<any> {
    return await this.todoService.updateDescription(Number(userId), Number(id), update);
  };

  @Delete(':userId/:id')
  async deleteTodoById(@Param('userId') userId: string, @Param('id') id: string): Promise<any> {
    return await this.todoService.deleteById(Number(userId), Number(id));
  };

  @Delete()
  async deleteAllTodos(): Promise<any> {
    return await this.todoService.deleteAll();
  };

}
