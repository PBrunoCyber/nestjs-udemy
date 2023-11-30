import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import 'dotenv/config'
import { Course } from './entities/courses.entity';
import { Tags } from './entities/tags.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('CoursesController', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[]

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_E2E,
    entities: [Course, Tags],
    synchronize: true,
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRootAsync({
        useFactory: async () => {
          return dataSourceTest;
        }
      })]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    data = {
      name: 'Node.js',
      description: "Node.js",
      tags: ['nodejs', 'nestjs']
    }

  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(Course);
    courses = await repository.find();
    await dataSource.destroy();
  })

  afterAll(async () => {
    await module.close();
  })

  // describe('POST /courses', () => {
  //   it("Should create a course", async () => {
  //     const res = await request(app.getHttpServer()).post('/courses').send(data).expect(201)
  //     expect(res.body.id).toBeDefined();
  //     expect(res.body.name).toEqual(data.name);
  //     expect(res.body.description).toEqual(data.description);
  //     expect(res.body.createdAt).toBeDefined();
  //     expect(res.body.tags[0].name).toEqual(data.tags[0]);
  //     expect(res.body.tags[1].name).toEqual(data.tags[1]);
  //   })
  // })

  // describe('GET /courses', () => {
  //   it("Should list all courses", async () => {
  //     const res = await request(app.getHttpServer()).get('/courses').expect(200)
  //     expect(res.body[0].id).toBeDefined();
  //     expect(res.body[0].name).toEqual(data.name);
  //     expect(res.body[0].description).toEqual(data.description);
  //     expect(res.body[0].createdAt).toBeDefined();
  //     res.body.map((item)=> expect(item).toEqual({id: item.id, name: item.name, description: item.description, createdAt: item.createdAt, tags: [...item.tags]}))
  //   })
  // })

  describe('GET /courses/:id', () => {
    it("Should gets a course by id", async () => {
      const res = await request(app.getHttpServer())
      .get(`/courses/${courses[0].id}`)
      .expect(200)
      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual(courses[0].name);
      expect(res.body.description).toEqual(courses[0].description);
    })
  })

  describe('PUT /courses/:id', () => {
    it("Should update a course", async () => {
      const updatedData = {
        name: 'New Name',
        description: "New Node.js",
        tags: ['one', 'two']
      }
      const res = await request(app.getHttpServer())
      .patch(`/courses/${courses[0].id}`)
      .send(updatedData)
      .expect(200)
      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual('New Name');
      expect(res.body.description).toEqual("New Node.js");
      expect(res.body.tags).toHaveLength(2);
      expect(res.body.tags[0].name).toEqual('one');
      expect(res.body.tags[1].name).toEqual('two');
    })
  })

  describe('DELETE /courses/:id', () => {
    it("Should delete a course", async () => {
      await request(app.getHttpServer())
      .delete(`/courses/${courses[0].id}`)
      .expect(204)
      .expect({})
    })
  })



});
