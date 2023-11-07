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
import { TasksService } from './tasks.service';

const resourceName = 'tasks';

@Controller(resourceName)
@UseGuards(ContainValidBearerTokenGuard)
@ApiBearerAuth()
@ApiTags(resourceName)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() requestBody: CreateTaskApiPayload,
    @RequestMaker() requestMaker: User,
  ) {
    return this.tasksService.create({
      title: requestBody.title,
      description: requestBody.description,
      dueDate: requestBody.dueDate,
      updatedById: requestMaker.id,
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
