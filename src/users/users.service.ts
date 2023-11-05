import { Injectable } from '@nestjs/common';
import { CreateUserPayload } from './dto/create-user.dto';
import { UpdateUserPayload } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserPayload) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserPayload) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
