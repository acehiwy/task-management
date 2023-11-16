import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestMaker } from 'src/common/decorators/request-maker.decorator';
import { ContainValidBearerTokenGuard } from 'src/common/guards/contain-valid-bearer-token/contain-valid-bearer-token.guard';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskApiPayload } from './dto/create-task.dto';
import { UpdateTaskApiPayload } from './dto/update-task.dto';
import { TasksRepo } from './tasks-repo.service';

const resourceName = 'tasks';

@Controller(resourceName)
@UseGuards(ContainValidBearerTokenGuard)
@ApiBearerAuth()
@ApiTags(resourceName)
export class TasksController {
  constructor(private readonly taskRepo: TasksRepo) {}

  @Post()
  async create(
    @Body() requestBody: CreateTaskApiPayload,
    @RequestMaker() requestMaker: User,
  ): Promise<Task> {
    const taskCreateResponse = await this.taskRepo.create({
      title: requestBody.title,
      description: requestBody.description,
      dueDate: requestBody.dueDate,
      updatedById: requestMaker.id,
    });

    return taskCreateResponse.result;
  }

  @Get()
  findAll() {
    return this.taskRepo.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const task = await this.taskRepo.findOne(id);

    if (task === null) throw new NotFoundException();

    return task;
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() requestBody: UpdateTaskApiPayload,
  ): Promise<Task> {
    const taskUpdateResponse = await this.taskRepo.update(id, requestBody);

    return taskUpdateResponse.result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.taskRepo.remove(id);

    return;
  }
}
