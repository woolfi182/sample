import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BaseException } from './exception';
import { User } from 'src/user/entities/user.entity';

class InvalidUser extends BaseException {
  status = 401;
  constructor(message: string, userId: any) {
    super(message, { userId });
  }
}

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user;

  if (!user) {
    throw new InvalidUser('User is not provided', user);
  }

  return user;
});
