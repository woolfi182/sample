import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TgSenderRepository } from '../repositories/tg-sender.repository';
import { TgCreateSenderDto } from '../dtos/tg-sender.dto';
import { TgSender } from '../entities/tg-sender.entity';
import { TgSenderEvents } from '../sender.events';

@Injectable()
export class TgSenderService {
  constructor(private readonly senderRepository: TgSenderRepository) {}

  @OnEvent(TgSenderEvents.UPDATE_SENDER)
  async updateSender(data: TgCreateSenderDto): Promise<TgSender> {
    const senderInDb = await this.senderRepository.getSenderByTgId(data.senderId);
    const sender = senderInDb ?? new TgSender();

    sender.username = data.username;
    sender.firstName = data.firstName;
    sender.lastName = data.lastName;
    sender.tgId = data.senderId;
    sender.langCode = data.langCode;
    sender.isBot = data.isBot;
    sender.isDeleted = data.isDeleted;
    sender.isPremium = data.isPremium;
    sender.isBotBusiness = data.isBotBusiness;
    sender.isRestricted = data.isRestricted;
    sender.isScam = data.isScam;

    return this.senderRepository.save(sender);
  }

  async getSenderByUsername(username: string): Promise<TgSender> {
    return this.senderRepository.getSenderByUsername(username);
  }
}
