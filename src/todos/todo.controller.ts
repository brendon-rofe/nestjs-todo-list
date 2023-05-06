import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/todo.interface';

@Controller('todos')
export class TodoController {

  constructor(private todoService: TodoService) {}

  @Post(':userId')
  createTodo(@Param('userId') userId: number, @Body() todo: Omit<Todo, 'id'>): Todo {
    return this.todoService.createTodo(userId, todo);
  }

  @Get(':userId')
  getAllUserTodos(@Param('userId') userId: number): Todo[] {
    return this.todoService.getAllUserTodos(userId);
  }

}
