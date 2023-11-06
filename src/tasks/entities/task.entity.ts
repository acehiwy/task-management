import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Task as PrismaTask } from '@prisma/client';

export class Task implements PrismaTask {
  id: PrismaTask['id'];
  title: PrismaTask['title'];
  description: PrismaTask['description'];
  dueDate: PrismaTask['dueDate'];

  @ApiProperty({ enum: Object.values($Enums.TaskStatus) })
  status: PrismaTask['status'];

  createdAt: PrismaTask['createdAt'];
  updatedAt: PrismaTask['updatedAt'];
  updatedById: PrismaTask['updatedById'];
}
