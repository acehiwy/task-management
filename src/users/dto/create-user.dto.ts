import { Prisma, User as PrismaUser } from '@prisma/client';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserApiPayload {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: PrismaUser['name'];
}

export type CreateUserPayload =
  Prisma.UserUncheckedCreateWithoutLastTaskTouchesInput;
