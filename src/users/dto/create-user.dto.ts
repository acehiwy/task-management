import { Prisma, User as PrismaUser } from '@prisma/client';

export class CreateUserApiPayload {
  name: PrismaUser['name'];
}

export type CreateUserPayload =
  Prisma.UserUncheckedCreateWithoutLastTaskTouchesInput;
