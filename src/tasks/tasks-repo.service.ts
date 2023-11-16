import { Rollbackable } from 'src/common/interfaces';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateTaskPayload } from './dto/create-task.dto';
import { UpdateTaskPayload } from './dto/update-task.dto';

export abstract class TasksRepo {
  abstract create(
    createTaskPayload: CreateTaskPayload,
  ): Rollbackable<Promise<Task>>;

  abstract findAll(): Promise<Task[]>;

  abstract findOne(id: Task['id']): Promise<Task | null>;

  abstract update(
    id: Task['id'],
    updateTaskPayload: UpdateTaskPayload,
  ): Rollbackable<Promise<Task>, Promise<Task>>;

  abstract remove(id: Task['id']): Rollbackable<Promise<void>, Promise<Task>>;
}
