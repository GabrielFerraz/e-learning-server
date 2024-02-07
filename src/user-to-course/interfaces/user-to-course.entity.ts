import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';

@Entity()
export class UserToCourse {
  @PrimaryGeneratedColumn()
  public user_to_course_id: number;

  @Column()
  public user_id: number;

  @Column()
  public course_id: number;

  @ManyToOne(() => Lesson)
  public lesson: Lesson;

  @ManyToOne(() => User, (user) => user.user_to_courses)
  public user: User;

  @ManyToOne(() => Course, (course) => course.user_to_courses)
  public course: Course;
}
