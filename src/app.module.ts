import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as process from 'process';
import { User } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { CourseModule } from './course/course.module';
import { Course } from './course/entities/course.entity';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entities/lesson.entity';
import { Comment } from './comments/entities/comment.entity';
import { Tag } from './tags/entities/tag.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { UserToCourse } from './user-to-course/interfaces/user-to-course.entity';
import { UserToCourseModule } from './user-to-course/user-to-course.module';
import { TeacherModule } from './teacher/teacher.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Course, Lesson, Teacher, Comment, Tag, UserToCourse],
      synchronize: +process.env.SYNC === 1,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    LessonModule,
    UserToCourseModule,
    TeacherModule,
    CommentsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
