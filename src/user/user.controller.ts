import { Body, Controller, Get, Logger, Patch } from '@nestjs/common';
import { UserService } from './services/user.service';
import { SocialPatchDto } from './dtos/social.dto';
import { SocialFactory } from './services/social.factory';
import { GetUser } from 'src/common/user-id.decorator';
import { User } from './entities/user.entity';

@Controller('/v1/users')
export class UserController {
  logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly socialFactory: SocialFactory,
  ) {}

  @Get()
  // TODO: Only for admins
  async getUsers(@GetUser() user: User) {
    this.logger.log({
      function: this.getUsers.name,
      message: 'Getting all users',
      payload: {
        userId: user.id,
      },
    });
    return {
      result: [],
    };
  }

  @Patch('/social')
  async setSocial(@Body() socialData: SocialPatchDto, @GetUser() user: User) {
    this.logger.log({
      function: this.setSocial.name,
      message: 'Setting social',
      payload: {
        userId: user.id,
        socialData,
      },
    });

    const social = await this.socialFactory.setSocial(user, socialData);

    return {
      result: social,
    };
  }

  @Get('/social')
  async getUserSocial(@GetUser() user: User) {
    this.logger.log({
      function: this.getUserSocial.name,
      message: 'Get user social',
      payload: {
        userId: user.id,
      },
    });
    // TODO: gather all socials
    return {
      result: [],
    };
  }
}
