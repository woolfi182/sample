import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { BaseException } from '../../common/exception';
import { RegisterDto } from 'src/auth/dtos';
import { EUserRole } from '../user.enum';

export class UserNotFoundException extends BaseException {
  status = 404;
  constructor(message: string, payload: any) {
    super(message ?? `User is not found`, payload);
  }
}

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUserByUsernameOrEmail(username: string, email: string): Promise<User> {
    const user = await this.userRepo.getUserByUsernameOrEmail(username, email);
    if (!user) {
      throw new UserNotFoundException(null, { username, email });
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepo.getUserByUsername(username);
    if (!user) {
      throw new UserNotFoundException(null, { username });
    }

    return user;
  }

  async createUser(createDto: RegisterDto): Promise<User> {
    const user = new User();
    user.username = createDto.username;
    user.email = createDto.email;
    user.password = createDto.password;
    user.role = EUserRole.USER;

    const newUser = await this.userRepo.create(user);
    newUser.password = null;

    return newUser;
  }
}
