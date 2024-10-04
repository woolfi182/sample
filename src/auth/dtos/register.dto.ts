import { IsEmail, IsString, MinLength } from 'class-validator';
import { IsPassword } from 'src/common/decorators/password.decorator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsPassword({ message: 'password too weak' })
  password: string;
}
