import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo.interface';

@Injectable()
export class TodosService {
  private todos: Map<number, Todo[]> = new Map();
  private nextUserI = 1;

  

}
