import { Survey } from '../../survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserVote } from './user-vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  document: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Survey, (survey) => survey.user)
  surveys: Survey[];
  
  @OneToMany(() => UserVote, (userVote) => userVote.user)
  userVote: UserVote[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
