import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { PrismaTaskRepo, TasksRepo } from './tasks-repo.service';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksRepo,
          useClass: PrismaTaskRepo,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
