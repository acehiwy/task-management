import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepo } from './tasks-repo.service';

describe('TasksService', () => {
  let service: TasksRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksRepo],
    }).compile();

    service = module.get<TasksRepo>(TasksRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
