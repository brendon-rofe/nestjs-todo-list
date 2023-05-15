import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  async createTodo(@Body() todo: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(todo);
  };

}
