import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../../survey/entities/survey.entity';
import { User } from './user.entity';

export type VoteAnswer = 'yes' | 'no';

@Entity()
export class UserVote {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'enum',
    enum: ['yes', 'no'],
    default: 'no',
  })
  vote: VoteAnswer;

  @ManyToOne(() => User, (user) => user.userVote)
  user: User;

  @ManyToOne(() => Survey, (survey) => survey.userVote)
  survey: Survey;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
