import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { Comment } from '../../comments/entities/comment.entity';
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  lesson_number: number;

  @Column('int')
  duration: number;

  @Column('text')
  video_url: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at!: Date;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @OneToMany(() => Comment, (comment) => comment.lesson)
  comments: Comment[];
}
