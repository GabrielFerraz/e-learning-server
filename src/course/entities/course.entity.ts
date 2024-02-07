import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { UserToCourse } from '../../user-to-course/interfaces/user-to-course.entity';
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  thumb_img: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at!: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

  @ManyToMany(() => Tag, (tag) => tag.courses)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => UserToCourse, (userToCourse) => userToCourse.course)
  user_to_courses: UserToCourse[];
}
