import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Comment {
  /*
  - [ ] id
	- [ ] body
	- [ ] user_id
	- [ ] reply_to_id
	- [ ] lesson_id
	- [ ] timestamps
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at!: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments)
  lesson: Lesson;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToOne(() => Comment)
  @JoinColumn()
  reply_to: Comment;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];
}
