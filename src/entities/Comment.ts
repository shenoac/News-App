import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId!: number;

  // define relations
  @Column()
  userId!: number;

  @Column()
  newsId!: number;

  @Column({ nullable: false })
  content!: string;

  @Column()
  timeStamp!: Date;
}
