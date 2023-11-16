import { User } from 'src/users/entities/user.entity';
import { CreateUserApiPayload } from './dto/create-user.dto';

export abstract class UserRepo {
  abstract create(createUserPayload: CreateUserApiPayload): Promise<User>;

  abstract findOne(id: User['id']): Promise<User | null>;
}
