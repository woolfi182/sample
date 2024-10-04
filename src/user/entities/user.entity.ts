import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EUserRole } from '../user.enum';
import { UserSocial } from './user-social.entity';
import { TgUserSocial } from './tg-user-social.entity';
import { Project } from '../../project/entities/project.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 30 })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;

  @OneToMany(() => UserSocial, (social) => social.user)
  socials: UserSocial[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToOne(() => TgUserSocial, (tgUserSocial) => tgUserSocial.user)
  tgUserSocial: TgUserSocial;
}
