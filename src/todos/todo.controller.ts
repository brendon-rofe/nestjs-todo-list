import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/todo.interface';
import { title } from 'process';

@Controller('todos')
export class TodoController {

  constructor(private todoService: TodoService) {}

  @Post(':userId')
  createTodo(@Param('userId') userId: number, @Body() body: any): Todo {
    return this.todoService.createTodo(userId, body);
  }

  @Get(':userId')
  getAllUserTodos(@Param('userId') userId: number): Todo[] {
    return this.todoService.getAllUserTodos(userId);
  }

}
