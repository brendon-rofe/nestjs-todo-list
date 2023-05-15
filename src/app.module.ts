import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [TodoModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
