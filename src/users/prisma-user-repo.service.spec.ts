import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepo } from './prisma-user-repo.service';

describe('PrismaUserRepoService', () => {
  let service: PrismaUserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaUserRepo],
    }).compile();

    service = module.get<PrismaUserRepo>(PrismaUserRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
