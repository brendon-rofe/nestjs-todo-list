import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo.interface';

@Injectable()
export class TodoService {
  private todos: Map<number, Todo[]> = new Map();



}
