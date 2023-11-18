import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { RequestMaker } from 'src/common/decorators/request-maker.decorator';
import { ContainValidBearerTokenGuard } from 'src/common/guards/contain-valid-bearer-token/contain-valid-bearer-token.guard';
import { EnvironmentVariables } from 'src/common/interfaces';
import { Stack } from 'src/common/stack';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskApiPayload } from './dto/create-task.dto';
import { UpdateTaskApiPayload } from './dto/update-task.dto';
import { TasksRepo } from './tasks-repo.service';
import { AvailableTaskQuery } from 'src/tasks/dto/read-task.dto';

const resourceName = 'tasks';

@Controller(resourceName)
@UseGuards(ContainValidBearerTokenGuard)
@ApiBearerAuth()
@ApiTags(resourceName)
export class TasksController {
  constructor(
    private readonly taskRepo: TasksRepo,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

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

    this.cacheRollbackOperation(requestMaker.id, taskCreateResponse.rollback);

    return taskCreateResponse.result;
  }

  @Get()
  findAll(@Query() query: AvailableTaskQuery) {
    const fromDueDate = query.fromDueDate;
    const untilDueDate = query.untilDueDate;
    const status = query.status;
    const updatedById = query.lastTouchBy;

    return this.taskRepo.findAll({
      dueDate: {
        ...(fromDueDate && { gte: fromDueDate }),
        ...(untilDueDate && { lte: untilDueDate }),
      },
      ...(status && { status }),
      ...(updatedById && { updatedById }),
    });
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
    @RequestMaker() requestMaker: User,
  ): Promise<Task> {
    const taskUpdateResponse = await this.taskRepo.update(id, requestBody);

    this.cacheRollbackOperation(requestMaker.id, taskUpdateResponse.rollback);

    return taskUpdateResponse.result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @RequestMaker() requestMaker: User,
  ) {
    const taskRemoveResponse = await this.taskRepo.remove(id);

    this.cacheRollbackOperation(requestMaker.id, taskRemoveResponse.rollback);

    return;
  }

  @Post('undo')
  @HttpCode(200)
  @ApiOperation({ summary: 'undo previous operation(s)' })
  async rollback(@RequestMaker() requestMaker: User) {
    const rollbackStack = await this.cacheManager.get<
      Stack<() => Promise<any>>
    >(requestMaker.id);

    const rollbackOperation = rollbackStack?.pop();

    if (rollbackOperation === undefined)
      throw new BadRequestException('No action to be rolled back');

    await rollbackOperation();

    return;
  }

  private async cacheRollbackOperation(
    key: string,
    operation: () => Promise<any>,
  ) {
    let operationStack =
      await this.cacheManager.get<Stack<typeof operation>>(key);

    if (operationStack === undefined) {
      operationStack = new Stack(
        this.configService.get('TASK_UNDO_OPERATION_MAX_CAPACITY'),
      );
    }

    operationStack.push(operation);
    await this.cacheManager.set(key, operationStack);
  }
}
