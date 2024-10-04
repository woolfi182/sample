import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { TgMessageService } from './tg-message.service';
import { EUserSocialType } from 'src/user/user.enum';
import { AbstractMessageService } from './abstract-message.service';

@Injectable()
export class MessageFactory {
  private readonly service: Record<EUserSocialType, AbstractMessageService>;
  constructor(tgMessageService: TgMessageService) {
    this.service = {
      [EUserSocialType.TELEGRAM]: tgMessageService,
    };
  }

  async saveMessage(messageData: CreateMessageDto) {
    const { type } = messageData;

    const concreteService = this.service[type];
    const message = concreteService.saveMessage(messageData.message, messageData.metadata);

    return message;
  }
}
