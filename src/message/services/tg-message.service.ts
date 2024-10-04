import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TgMessageRepository } from '../repositories/tg-message.repository';
import { AbstractMessageService } from './abstract-message.service';
import { TgCreateMessageMetadata } from '../dtos/create-message.dto';
import { TgMessage } from '../entities/tg-message.entity';
import { TgSenderEvents } from 'src/sender/sender.events';
import { TgGroupEvents } from 'src/group/group.events';

@Injectable()
export class TgMessageService extends AbstractMessageService {
  constructor(
    private readonly tgMessageRepository: TgMessageRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }

  async saveMessage(message: string, metadata: TgCreateMessageMetadata): Promise<any> {
    const tgMessage = new TgMessage();
    tgMessage.message = message;
    tgMessage.tgId = metadata.messageId;

    const [group] = await this.eventEmitter.emitAsync(TgGroupEvents.GET_GROUP_BY_TG_ID, metadata.groupId);
    const [sender] = await this.eventEmitter.emitAsync(TgSenderEvents.UPDATE_SENDER, metadata.sender);
    tgMessage.sender = sender;
    tgMessage.group = group;

    const savedMessage = await this.tgMessageRepository.save(tgMessage);

    return tgMessage;
  }
}
