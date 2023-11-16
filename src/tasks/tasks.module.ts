import { Module } from '@nestjs/common';
import { PrismaTaskRepo } from 'src/tasks/prisma-task-repo.service';
import { TasksRepo } from 'src/tasks/tasks-repo.service';
import { PrismaUserRepo, UserRepo } from 'src/users/users-repo.service';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TasksRepo,
      useClass: PrismaTaskRepo,
    },
    {
      provide: UserRepo,
      useClass: PrismaUserRepo,
    },
  ],
})
export class TasksModule {}
