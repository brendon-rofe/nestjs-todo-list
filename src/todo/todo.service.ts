import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {

  createTodo() {
    return { message: 'This creates a new todo' };
  }

}
