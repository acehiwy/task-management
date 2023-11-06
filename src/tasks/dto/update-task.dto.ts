import { PartialType } from '@nestjs/swagger';
import {
  CreateTaskApiPayload,
  CreateTaskPayload,
} from 'src/tasks/dto/create-task.dto';

export class UpdateTaskApiPayload extends PartialType(CreateTaskApiPayload) {}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
