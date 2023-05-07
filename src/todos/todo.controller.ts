import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/todo.interface';

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

  @Get(':userId/:id')
  getTodoById(@Param('userId') userId: number, @Param('id') id: number): Todo {
    return this.todoService.getTodoById(userId, id);
  }

}
