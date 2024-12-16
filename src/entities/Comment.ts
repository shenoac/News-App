import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User.js';
import { News } from './News.js';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => News)
  news!: News;

  @Column({ type: 'varchar' })
  content!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  timeStamp?: Date;
}
