import { Module } from '@nestjs/common';
import { PrismaUserRepo, UserRepo } from './users-repo.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepo,
      useClass: PrismaUserRepo,
    },
  ],
})
export class UsersModule {}
