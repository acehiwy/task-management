import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateTaskPayload } from './dto/create-task.dto';
import { UpdateTaskPayload } from './dto/update-task.dto';

export abstract class TasksService {
  abstract create(createTaskPayload: CreateTaskPayload): Promise<Task>;

  abstract findAll(): Promise<Task[]>;

  abstract findOne(id: Task['id']): Promise<Task | null>;

  abstract update(
    id: Task['id'],
    updateTaskPayload: UpdateTaskPayload,
  ): Promise<Task>;

  abstract remove(id: Task['id']): Promise<void>;
}

@Injectable()
export class PrismaTaskService implements TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskPayload: CreateTaskPayload) {
    return this.prismaService.task.create({
      data: {
        id: createTaskPayload.id,
        title: createTaskPayload.title,
        description: createTaskPayload.description,
        dueDate: createTaskPayload.dueDate,
        status: createTaskPayload.status,
        createdAt: createTaskPayload.createdAt,
        updatedAt: createTaskPayload.updatedAt,
        updatedBy: {
          connect: {
            id: createTaskPayload.updatedById,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.task.findMany();
  }

  findOne(id: string) {
    return this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTaskPayload: UpdateTaskPayload) {
    return this.prismaService.task.update({
      data: {
        updatedById: updateTaskPayload.updatedById,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.prismaService.task.delete({
      where: {
        id,
      },
    });

    return;
  }
}
