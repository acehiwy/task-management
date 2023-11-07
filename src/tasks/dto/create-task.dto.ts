import { Prisma, Task as PrismaTask } from '@prisma/client';

export class CreateTaskApiPayload {
  title: PrismaTask['title'];
  description: PrismaTask['description'];
  dueDate: PrismaTask['dueDate'];
}

export type CreateTaskPayload = Omit<
  Prisma.TaskUncheckedCreateInput,
  'createdAt' | 'updatedAt'
>;
