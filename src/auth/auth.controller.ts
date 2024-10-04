import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { Public } from 'src/common/decorators/is-public';

@Controller('/v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    this.logger.log({
      function: this.login.name,
      message: 'User is trying to login',
      payload: {
        username: loginData.username,
      },
    });

    const auth = await this.authService.login(loginData);
    return {
      result: auth,
    };
  }

  @Public()
  @Post('/register')
  async register(@Body() registerData: RegisterDto) {
    this.logger.log({
      function: this.register.name,
      message: 'User is trying to register',
      payload: {
        username: registerData.username,
        email: registerData.email,
      },
    });

    const auth = await this.authService.register(registerData);
    return {
      result: auth,
    };
  }
}
