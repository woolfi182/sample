import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TgSender } from '../../sender/entities/tg-sender.entity';
import { TgGroup } from '../../group/entities/tg-group.entity';

@Entity({ name: 'tg_messages' })
export class TgMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  tgId: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @ManyToOne((type) => TgSender, (tgSender) => tgSender.messages)
  @JoinColumn()
  sender: TgSender;

  @ManyToOne((type) => TgGroup, (tgGroup) => tgGroup.messages)
  @JoinColumn()
  group: TgGroup;
}
