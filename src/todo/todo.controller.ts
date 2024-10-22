import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './createTodo.dto';
import { Todo } from 'src/todo.model';

@Controller('todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  async createTodo(@Param('userId') userId: string ,@Body() todo: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(userId, todo);
  };

  @Get(':userId')
  async getAllUserTodos(@Param('userId') userId: string): Promise<Todo[]> {
    return await this.todoService.getAllUserTodos(userId);
  };

  @Get(':userId/:id')
  async getTodoById(@Param('userId') userId: string, @Param('id') id: string): Promise<Todo> {
    return await this.todoService.getById(userId, Number(id));
  };

  @Put('/complete/:userId/:id')
  async markTodoComplete(@Param('userId') userId: string, @Param('id') id: string): Promise<any> {
    return await this.todoService.markComplete(userId, Number(id));
  };

  @Put('/update-title/:userId/:id')
  async updateTodoTitle(
    @Param('userId') userId: string, 
    @Param('id') id: string, 
    @Body() update: any): Promise<any> {
    return await this.todoService.updateTitle(userId, Number(id), update);
  };

  @Put('/update-description/:userId/:id')
  async updateTodoDescription(
    @Param('userId') userId: string, 
    @Param('id') id: string, 
    @Body() update: any): Promise<any> 
  {
    return await this.todoService.updateDescription(userId, Number(id), update);
  };

  @Delete(':userId/:id')
  async deleteTodoById(@Param('userId') userId: string, @Param('id') id: string): Promise<any> {
    return await this.todoService.deleteById(userId, Number(id));
  };

  @Delete(':userId')
  async deleteAllTodos(@Param('userId') userId: string): Promise<any> {
    return await this.todoService.deleteAll(userId);
  };

}
