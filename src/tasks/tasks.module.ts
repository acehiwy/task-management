import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { PrismaTaskService, TasksService } from './tasks.service';
import { PrismaUserRepo, UserRepo } from 'src/users/users-repo.service';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TasksService,
      useClass: PrismaTaskService,
    },
    {
      provide: UserRepo,
      useClass: PrismaUserRepo,
    },
  ],
})
export class TasksModule {}
