import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateTaskApiPayload } from './dto/create-task.dto';
import { UpdateTaskApiPayload } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { extractBearerToken } from 'src/common/helpers';
import { ContainValidBearerTokenGuard } from 'src/common/guards/contain-valid-bearer-token/contain-valid-bearer-token.guard';

const resourceName = 'tasks';

@Controller(resourceName)
@UseGuards(ContainValidBearerTokenGuard)
@ApiBearerAuth()
@ApiTags(resourceName)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() requestBody: CreateTaskApiPayload, @Req() req: Request) {
    const requestMakerUserId = extractBearerToken(
      req.get('authorization') as string,
    ) as string;

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
