import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestMaker = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.requestMaker;
  },
);
