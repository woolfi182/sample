import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '../dtos';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';
import { BaseException } from 'src/common/exception';

export class UserAlreadyExists extends BaseException {
  status = 400;
  constructor(message: string, payload: any) {
    super(message ?? `User already exists`, payload);
  }
}

const HASH_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginData: LoginDto) {
    const user = await this.userService.getUserByUsernameOrEmail(loginData.username, loginData.password);
    const isValid = await this.validateUser(loginData, user);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerData: RegisterDto) {
    const [_err, user] = await this.userService
      .getUserByUsernameOrEmail(registerData.username, registerData.email)
      .tuple();
    if (user) {
      throw new UserAlreadyExists('User already exists', {
        username: registerData.username,
        email: registerData.email,
      });
    }

    registerData.password = bcrypt.hashSync(registerData.password, HASH_SALT_ROUNDS);
    const regUser = await this.userService.createUser(registerData);

    const payload = { username: registerData.username, userId: regUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(loginData: LoginDto, user: User) {
    const isValidPass = bcrypt.compareSync(loginData.password, user.password);
    const isValidLogin = loginData.username === user.username;
    return isValidPass && isValidLogin;
  }

  async getUserByUsername(username: string) {
    return this.userService.getUserByUsername(username);
  }
}
