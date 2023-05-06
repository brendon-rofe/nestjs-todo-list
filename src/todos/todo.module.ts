import { Module } from '@nestjs/common';
import { TodosController } from './todo.controller';
import { TodosService } from './todo.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
