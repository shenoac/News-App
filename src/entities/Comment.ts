import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
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

  @Column({ nullable: false })
  content!: string;

  @Column({ type: 'timestamp', nullable: true })
  timeStamp?: Date | null;
}
