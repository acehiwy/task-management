import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateUserApiPayload } from './dto/create-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class UserRepo {
  abstract create(createUserPayload: CreateUserApiPayload): Promise<User>;

  abstract findOne(id: User['id']): Promise<User | null>;
}

@Injectable()
export class PrismaUserRepo implements UserRepo {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserPayload: CreateUserApiPayload): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: createUserPayload.name,
      },
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
