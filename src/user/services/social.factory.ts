import { Injectable } from '@nestjs/common';
import { SocialPatchDto } from '../dtos/social.dto';
import { TelegramService } from './telegram.service';
import { User } from '../entities/user.entity';
import { ASocialService, SocialNotFoundException } from './abstract.social.service';

const ESocialService: { [k: string]: ASocialService } = {};

@Injectable()
export class SocialFactory {
  constructor(private readonly telegramService: TelegramService) {
    ESocialService.telegram = this.telegramService;
  }

  async setSocial(user: User, socialData: SocialPatchDto) {
    const { type, data } = socialData;
    const klass = ESocialService[type];
    if (!klass) {
      throw new SocialNotFoundException({ type });
    }

    return klass.setSocial(user, data);
  }
}
