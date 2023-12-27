import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type SurveyStatus = 'closed' | 'open';

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

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
