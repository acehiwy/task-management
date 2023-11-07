import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestMaker } from 'src/common/decorators/request-maker.decorator';
import { ContainValidBearerTokenGuard } from 'src/common/guards/contain-valid-bearer-token/contain-valid-bearer-token.guard';
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
  create(
    @Body() requestBody: CreateTaskApiPayload,
    @RequestMaker() requestMaker: User,
  ) {
    return this.taskRepo.create({
      title: requestBody.title,
      description: requestBody.description,
      dueDate: requestBody.dueDate,
      updatedById: requestMaker.id,
    });
  }

  @Get()
  findAll() {
    return this.taskRepo.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskRepo.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() requestBody: UpdateTaskApiPayload) {
    return this.taskRepo.update(id, requestBody);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskRepo.remove(id);
  }
}
