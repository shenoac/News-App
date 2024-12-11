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

  @Column({ type: 'varchar' })
  content!: string;

  @Column({ type: 'date', nullable: true })
  timeStamp?: Date | null;
}
