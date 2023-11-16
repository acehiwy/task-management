import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserApiPayload } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PrismaUserRepo {
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
