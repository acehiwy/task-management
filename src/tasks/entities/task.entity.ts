import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Task as PrismaTask } from '@prisma/client';

export const TASK_STATUS = Object.values($Enums.TaskStatus);
export type TaskStatus = $Enums.TaskStatus;

export class Task implements PrismaTask {
  id: PrismaTask['id'];
  title: PrismaTask['title'];
  description: PrismaTask['description'];
  dueDate: PrismaTask['dueDate'];

  @ApiProperty({ enum: TASK_STATUS })
  status: PrismaTask['status'];

  createdAt: PrismaTask['createdAt'];
  updatedAt: PrismaTask['updatedAt'];
  updatedById: PrismaTask['updatedById'];
}
