import { Test, TestingModule } from '@nestjs/testing';
import { UserToCourseController } from './user-to-course.controller';
import { UserToCourseService } from './user-to-course.service';

describe('UserToCourseController', () => {
  let controller: UserToCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToCourseController],
      providers: [UserToCourseService],
    }).compile();

    controller = module.get<UserToCourseController>(UserToCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
