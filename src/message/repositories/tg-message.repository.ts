import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TgMessage } from '../entities/tg-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TgMessageRepository {
  constructor(
    @InjectRepository(TgMessage)
    private readonly tgMessageRepo: Repository<TgMessage>,
  ) {}

  async saveMessage(message: TgMessage): Promise<TgMessage> {
    return this.tgMessageRepo.save(message);
  }
}
