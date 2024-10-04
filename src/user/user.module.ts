import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { SocialFactory } from './services/social.factory';
import { TelegramService } from './services/telegram.service';
import { SocialRepository } from './repositories/social.repository';
import { UserSocial } from './entities/user-social.entity';
import { SenderModule } from 'src/sender/sender.module';
import { TgUserSocial } from './entities/tg-user-social.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSocial, TgUserSocial]), SenderModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, SocialFactory, SocialRepository, TelegramService],
  exports: [UserService],
})
export class UserModule {}
