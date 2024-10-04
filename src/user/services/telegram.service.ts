import { Injectable } from '@nestjs/common';
import { SocialTelegramDto } from '../dtos/social.dto';
import { EUserSocialType } from '../user.enum';
import { User } from '../entities/user.entity';
import { SocialRepository } from '../repositories/social.repository';
import { UserSocial } from '../entities/user-social.entity';
import { BaseException } from 'src/common/exception';
import { TgSenderService } from 'src/sender/services/tg-sender.service';
import { ASocialService } from './abstract.social.service';

export class TgSenderNotFound extends BaseException {
  status = 400;
  constructor(payload: any) {
    super('Telegram sender not found', payload);
  }
}

@Injectable()
export class TelegramService implements ASocialService {
  constructor(
    private readonly socialRepo: SocialRepository,
    private readonly tgSenderService: TgSenderService,
  ) {}

  async setSocial(user: User, data: SocialTelegramDto): Promise<any> {
    const tgSender = await this.tgSenderService.getSenderByUsername(data.username);
    if (!tgSender) {
      // TODO: fetch info about this sender
      throw new TgSenderNotFound({ userId: user.id, ...data });
    }

    const socialData = new UserSocial();
    socialData.user = user;
    socialData.type = EUserSocialType.TELEGRAM;

    const social = await this.socialRepo.create(socialData);
    return social;
  }
}
