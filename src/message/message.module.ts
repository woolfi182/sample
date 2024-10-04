import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TgMessage } from './entities/tg-message.entity';
import { TgMessageService } from './services/tg-message.service';
import { TgMessageRepository } from './repositories/tg-message.repository';
import { MessageFactory } from './services/message.factory';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TgMessage])],
  controllers: [MessageController],
  providers: [MessageFactory, TgMessageService, TgMessageRepository],
  exports: [],
})
export class MessageModule {}
