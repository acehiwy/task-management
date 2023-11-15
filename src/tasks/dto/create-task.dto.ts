import { Prisma, Task as PrismaTask } from '@prisma/client';
import { IsISO8601, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskApiPayload {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: PrismaTask['title'];

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: PrismaTask['description'];

  @IsISO8601()
  dueDate: PrismaTask['dueDate'];
}

export type CreateTaskPayload = Omit<
  Prisma.TaskUncheckedCreateInput,
  'createdAt' | 'updatedAt'
>;
