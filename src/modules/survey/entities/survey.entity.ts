import { UserVote } from '../../../modules/users/entities/user-vote.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type SurveyStatus = 'closed' | 'opened';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  question: string;

  @ManyToOne(() => User, (user) => user.surveys)
  user: User;

  @Column({ nullable: true })
  expires_at: Date;

  @Column({
    type: 'enum',
    enum: ['closed', 'opened'],
    default: 'opened',
  })
  status: SurveyStatus;

  @Column()
  votes: number;

  @OneToMany(() => UserVote, (userVote) => userVote.survey)
  userVote: UserVote[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
