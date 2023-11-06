import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskApiPayload } from './dto/create-task.dto';
import { UpdateTaskApiPayload } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() requestBody: CreateTaskApiPayload,
    @Headers('User-Id') requestMakerUserId: string,
  ) {
    return this.tasksService.create({
      title: requestBody.title,
      description: requestBody.description,
      dueDate: requestBody.dueDate,
      updatedById: requestMakerUserId,
    });
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() requestBody: UpdateTaskApiPayload) {
    return this.tasksService.update(id, requestBody);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
