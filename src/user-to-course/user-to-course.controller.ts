import { Controller } from '@nestjs/common';
import { UserToCourseService } from './user-to-course.service';

@Controller('user-to-course')
export class UserToCourseController {
  constructor(private readonly userToCourseService: UserToCourseService) {}
}
