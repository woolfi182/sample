import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TgUserSocial } from '../../user/entities/tg-user-social.entity';
import { TgMessage } from '../../message/entities/tg-message.entity';

@Entity({ name: 'tg_senders' })
export class TgSender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  tgId: string;

  @Column()
  langCode: string;

  @Column()
  isBot: boolean;

  @Column()
  isDeleted: boolean;

  @Column()
  isPremium: boolean;

  @Column()
  isBotBusiness: boolean;

  @Column()
  isRestricted: boolean;

  @Column()
  isScam: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  @OneToOne(() => TgUserSocial, (tgSocial) => tgSocial.user)
  tgUserSocial: TgUserSocial;

  @OneToMany(() => TgMessage, (message) => message.sender)
  messages: TgMessage[];
}
