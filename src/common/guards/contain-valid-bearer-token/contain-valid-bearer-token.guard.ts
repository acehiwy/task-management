import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, from, map } from 'rxjs';
import { extractBearerToken } from 'src/common/helpers';
import { UserRepo } from 'src/users/users-repo.service';

@Injectable()
export class ContainValidBearerTokenGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepo) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.get('authorization');

    if (authorizationHeader == undefined) throw new UnauthorizedException();

    const token = extractBearerToken(authorizationHeader);

    if (!token) throw new UnauthorizedException();

    return from(
      // this query can be dissmissed if we have implemented JWT auth
      this.userRepo.findOne(token),
    ).pipe(
      map((user) => {
        if (user != null) request.requestMaker = user;

        return user != null;
      }),
    );
  }
}
