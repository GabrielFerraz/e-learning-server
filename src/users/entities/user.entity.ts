import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Lesson } from '../../lesson/entities/lesson.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column('tinyint', {
    nullable: true,
    default: 0,
  })
  is_admin: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at!: Date;

  @ManyToMany(() => Lesson)
  @JoinTable()
  completed: Lesson[];

  @ManyToMany(() => Lesson)
  @JoinTable()
  favorites: Lesson[];

  @ManyToMany(() => Lesson)
  @JoinTable()
  watch_list: Lesson[];
}
