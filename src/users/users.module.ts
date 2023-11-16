import { Module } from '@nestjs/common';
import { PrismaUserRepo } from 'src/users/prisma-user-repo.service';
import { UserRepo } from 'src/users/users-repo.service';
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
