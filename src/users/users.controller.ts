import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserApiPayload } from './dto/create-user.dto';
import { UserRepo } from './users-repo.service';
import { ApiTags } from '@nestjs/swagger';

const resourceName = 'users';

@Controller(resourceName)
@ApiTags(resourceName)
export class UsersController {
  constructor(private readonly usersService: UserRepo) {}

  @Post()
  create(@Body() createUserDto: CreateUserApiPayload) {
    return this.usersService.create(createUserDto);
  }
}
