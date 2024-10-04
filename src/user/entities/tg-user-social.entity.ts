import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { TgSender } from '../../sender/entities/tg-sender.entity';

@Entity({ name: 'tg_user_socials' })
export class TgUserSocial {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User, (user) => user.tgUserSocial)
  @JoinColumn()
  user: User;

  @OneToOne((type) => TgSender, (tgSender) => tgSender.tgUserSocial)
  @JoinColumn()
  sender: TgSender;
}
