import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { randomUUID } from 'crypto';
import { CreateCourseDTO } from './dto/create-courses.dto';
import { UpdateCourseDTO } from './dto/update-courses.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let createdAt: Date;
  let expectOutPutTags: any;
  let expectOutPutCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    createdAt = new Date();
    expectOutPutTags = [
      {id, name: 'Nestjs', createdAt}
    ]
    expectOutPutCourses = {
      id, 
      name: 'Test',
      description: 'Test description',
      createdAt,
      tags: expectOutPutTags,
    },
    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses))
    },
    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutPutTags)),
      findOne: jest.fn()
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    }
    const newCourse = await service.create(createCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(newCourse);
  });

  it('should list all courses', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(courses);
  });

  it('should gets a course by id', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(course);
  });

  it('should update a course', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    }
    const newCourse = await service.update(id,updateCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(newCourse);
    console.log(expectOutPutCourses);
  });

  it('should remove a course', async () => {
    service['courseRepository'] = mockCourseRepository;
    service['tagRepository'] = mockTagRepository;

    const course = await service.remove(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(course);
  });

});
