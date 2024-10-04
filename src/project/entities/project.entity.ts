import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EProjectStatus } from '../project.enum';
import { User } from '../../user/entities/user.entity';

// TODO: Add User and name as unique constraint

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: EProjectStatus,
    default: EProjectStatus.ACTIVE,
  })
  status: EProjectStatus;

  @Column({ type: 'text' })
  leadRequirements: string;

  // https://stackoverflow.com/questions/58475174/how-do-i-query-an-array-in-typeorm#answer-62852784
  @Column({ type: 'text', array: true })
  groups: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.projects)
  @JoinColumn()
  user: User;
}
