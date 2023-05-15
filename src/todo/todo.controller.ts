import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<any[]> {
    return await this.todoService.getAllTodos();
  }

}
