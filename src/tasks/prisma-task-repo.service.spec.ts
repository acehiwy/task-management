import { Test, TestingModule } from '@nestjs/testing';
import { PrismaTaskRepo } from 'src/tasks/prisma-task-repo.service';

describe('PrismaTaskRepoService', () => {
  let service: PrismaTaskRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaTaskRepo],
    }).compile();

    service = module.get<PrismaTaskRepo>(PrismaTaskRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
