import { Module } from '@nestjs/common';
import { UserToCourseService } from './user-to-course.service';
import { UserToCourseController } from './user-to-course.controller';

@Module({
  controllers: [UserToCourseController],
  providers: [UserToCourseService]
})
export class UserToCourseModule {}
