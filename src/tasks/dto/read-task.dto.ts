import { Task as PrismaTask } from '@prisma/client';
import { IsISO8601, IsIn, IsOptional, IsUUID } from 'class-validator';
import { TASK_STATUS } from 'src/tasks/entities/task.entity';

export class AvailableTaskQuery {
  @IsOptional()
  @IsISO8601()
  fromDueDate?: string;

  @IsOptional()
  @IsISO8601()
  untilDueDate?: string;

  @IsOptional()
  @IsIn(TASK_STATUS)
  status?: PrismaTask['status'];

  @IsOptional()
  @IsUUID(4)
  lastTouchBy?: PrismaTask['updatedById'];
}
