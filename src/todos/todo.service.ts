import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo.interface';

@Injectable()
export class TodoService {
  private todos: Map<number, Todo[]> = new Map();

  createTodo(userId: number, todo: Omit<Todo, 'id'>): Todo {
    const id = this.todos.get(userId)?.length || 1;
    const newTodo: Todo = {...todo, id};
    return newTodo;
  }

}
