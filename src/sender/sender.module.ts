import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TgSenderRepository } from './repositories/tg-sender.repository';
import { TgSenderService } from './services/tg-sender.service';
import { TgSender } from './entities/tg-sender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TgSender])],
  providers: [TgSenderService, TgSenderRepository],
  exports: [TgSenderService],
})
export class SenderModule {}
