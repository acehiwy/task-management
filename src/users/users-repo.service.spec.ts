import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepo, UserRepo } from './users-repo.service';

describe('UsersService', () => {
  let service: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepo,
          useClass: PrismaUserRepo,
        },
      ],
    }).compile();

    service = module.get<UserRepo>(UserRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
