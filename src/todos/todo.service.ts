import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo.interface';

@Injectable()
export class TodoService {
  private todos: Map<number, Todo[]> = new Map();

  createTodo(userId: number, body: any): Todo {
    const id = this.todos.get(userId)?.length + 1 || 1;
    const newTodo: Todo = {
      id: id,
      userId: userId,
      title: body.title,
      completed: false
    };
    if(this.todos.has(userId)) {
      this.todos.get(userId).push(newTodo);
    } else {
      this.todos.set(userId, [newTodo]);
    }
    return newTodo;
  }

  getAllUserTodos(userId: number): Todo[] {
    return this.todos.get(userId) || [];
  }

  getTodoById(userId: number, id: number): Todo {
    return this.todos.get(userId)?.find(todo => todo.id === id);
  }

}
