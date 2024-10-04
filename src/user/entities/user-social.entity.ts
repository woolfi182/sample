import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EUserSocialType } from '../user.enum';
import { User } from './user.entity';

@Entity({ name: 'user_socials' })
export class UserSocial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: EUserSocialType;

  @ManyToOne((type) => User, (user) => user.socials)
  @JoinColumn()
  user: User;
}
