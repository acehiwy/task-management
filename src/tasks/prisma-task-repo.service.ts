import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTaskPayload } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskPayload } from 'src/tasks/dto/update-task.dto';
import { TasksRepo } from 'src/tasks/tasks-repo.service';

@Injectable()
export class PrismaTaskRepo implements TasksRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskPayload: CreateTaskPayload) {
    const task = await this.prismaService.task.create({
      data: {
        id: createTaskPayload.id,
        title: createTaskPayload.title,
        description: createTaskPayload.description,
        dueDate: createTaskPayload.dueDate,
        status: createTaskPayload.status,
        updatedBy: {
          connect: {
            id: createTaskPayload.updatedById,
          },
        },
      },
    });

    return {
      result: task,
      rollback: () => this._remove(task.id),
    };
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

  async update(id: string, updateTaskPayload: UpdateTaskPayload) {
    const task = await this.findOne(id);

    if (task === null) throw new NotFoundException(`Task: ${id} not found`);

    const updatedTask = await this.prismaService.task.update({
      data: {
        id: updateTaskPayload.id,
        title: updateTaskPayload.title,
        description: updateTaskPayload.description,
        dueDate: updateTaskPayload.dueDate,
        status: updateTaskPayload.status,
        updatedById: updateTaskPayload.updatedById,
      },
      where: {
        id,
      },
    });

    return {
      result: updatedTask,
      rollback: () => this.upsert(task.id, task, task),
    };
  }

  async remove(id: string) {
    const task = await this.findOne(id);

    await this._remove(id);

    return {
      result: undefined,
      rollback: async () => {
        if (task === null)
          throw new NotFoundException(
            `Unable to rollback. Task: ${id} was not found at previous remove-operation`,
          );

        return this.upsert(task.id, task, task);
      },
    };
  }

  private async _remove(id: string) {
    try {
      await this.prismaService.task.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2025' // record not found
      ) {
        return;
      }

      throw error;
    }
  }

  private async upsert(
    id: string,
    taskUpdate: UpdateTaskPayload,
    taskCreate: CreateTaskPayload,
  ) {
    const task = await this.prismaService.task.upsert({
      where: {
        id,
      },
      update: taskUpdate,
      create: taskCreate,
    });

    return task;
  }
}
