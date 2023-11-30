import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';
import { Tags } from './entities/tags.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tags])],
    controllers: [CoursesController],
    providers: [CoursesService]
})
export class CoursesModule {}
