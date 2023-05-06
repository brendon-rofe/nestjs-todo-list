import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todo.module';

@Module({
  imports: [TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
