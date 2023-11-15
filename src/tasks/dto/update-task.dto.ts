import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums, Task as PrismaTask } from '@prisma/client';
import { IsIn } from 'class-validator';
import {
  CreateTaskApiPayload,
  CreateTaskPayload,
} from 'src/tasks/dto/create-task.dto';

const taskStatuses = Object.values($Enums.TaskStatus);

export class UpdateTaskApiPayload extends PartialType(CreateTaskApiPayload) {
  @ApiProperty({ enum: taskStatuses })
  @IsIn(taskStatuses)
  status?: PrismaTask['status'];
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
