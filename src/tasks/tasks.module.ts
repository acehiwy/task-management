import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { PrismaTaskRepo, TasksRepo } from './tasks-repo.service';
import { PrismaUserRepo, UserRepo } from 'src/users/users-repo.service';

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
