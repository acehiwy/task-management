import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { PrismaTaskService, TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TasksService,
      useClass: PrismaTaskService,
    },
  ],
})
export class TasksModule {}
