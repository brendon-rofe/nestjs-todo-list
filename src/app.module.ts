import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
