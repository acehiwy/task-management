import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums, Task as PrismaTask } from '@prisma/client';
import {
  CreateTaskApiPayload,
  CreateTaskPayload,
} from 'src/tasks/dto/create-task.dto';

export class UpdateTaskApiPayload extends PartialType(CreateTaskApiPayload) {
  @ApiProperty({ enum: Object.values($Enums.TaskStatus) })
  status?: PrismaTask['status'];
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
