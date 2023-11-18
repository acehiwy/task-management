import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Task as PrismaTask } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';
import {
  CreateTaskApiPayload,
  CreateTaskPayload,
} from 'src/tasks/dto/create-task.dto';
import { TASK_STATUS } from 'src/tasks/entities/task.entity';

export class UpdateTaskApiPayload extends PartialType(CreateTaskApiPayload) {
  @ApiProperty({ enum: TASK_STATUS })
  @IsIn(TASK_STATUS)
  @IsOptional()
  status?: PrismaTask['status'];
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
