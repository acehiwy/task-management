import { PartialType } from '@nestjs/mapped-types';
import {
  CreateTaskApiPayload,
  CreateTaskPayload,
} from 'src/tasks/dto/create-task.dto';

export class UpdateTaskApiPayload extends PartialType(CreateTaskApiPayload) {}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
