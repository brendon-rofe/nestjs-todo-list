import { Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo() {
    return this.todoService.createTodo();
  }

}
