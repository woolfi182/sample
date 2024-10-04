import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TgSender } from '../entities/tg-sender.entity';

@Injectable()
export class TgSenderRepository {
  constructor(
    @InjectRepository(TgSender)
    private readonly tgSenderRepo: Repository<TgSender>,
  ) {}

  async getSenderByTgId(tgId: string): Promise<TgSender> {
    return this.tgSenderRepo.findOne({ where: { tgId } });
  }

  async save(sender: TgSender): Promise<TgSender> {
    return this.tgSenderRepo.save(sender);
  }

  async getSenderByUsername(username: string): Promise<TgSender> {
    return this.tgSenderRepo.findOne({ where: { username } });
  }
}
