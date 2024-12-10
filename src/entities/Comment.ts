import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId!: number;

  @Column({ nullable: false })
  content!: string;

  @Column()
  timeStamp!: Date;
}
