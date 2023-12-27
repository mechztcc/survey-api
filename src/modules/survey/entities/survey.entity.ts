import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  question: string;

  @ManyToOne(() => User, (user) => user.surveys)
  user: User;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
