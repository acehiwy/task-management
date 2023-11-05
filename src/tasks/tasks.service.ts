import { Injectable } from '@nestjs/common';
import { CreateTaskPayload } from './dto/create-task.dto';
import { UpdateTaskPayload } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskPayload) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskPayload) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
