import { Test, TestingModule } from '@nestjs/testing';
import { UserToCourseService } from './user-to-course.service';

describe('UserToCourseService', () => {
  let service: UserToCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserToCourseService],
    }).compile();

    service = module.get<UserToCourseService>(UserToCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
