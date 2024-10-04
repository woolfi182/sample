import { IsString, MinLength } from 'class-validator';
import { IsPassword } from 'src/common/decorators/password.decorator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(8)
  @IsPassword({ message: 'password too weak' })
  password: string;
}
