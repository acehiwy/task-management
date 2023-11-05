import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPayload } from './create-user.dto';

export class UpdateUserPayload extends PartialType(CreateUserPayload) {}
