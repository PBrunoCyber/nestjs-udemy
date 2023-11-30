import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-courses.dto';
import { UpdateCourseDTO } from './dto/update-courses.dto';

@Injectable()
export class CoursesService {
    @InjectRepository(Course) private courseRepository: Repository<Course>;
    @InjectRepository(Tags) private tagRepository: Repository<Tags>;


    async findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        });
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({ where: { id }, relations: ['tags'] });
        if (!course) throw new NotFoundException(`Unable to perform this action`, { cause: new Error(), description: `Course ID ${id} not found` });
        return course;
    }

    async create(createCourseDTO: CreateCourseDTO) {
        const tags = await Promise.all(
            createCourseDTO.tags.map((name) => {
                return this.preloadTagByName(name);
            })
        )
        const course = this.courseRepository.create({
            ...createCourseDTO,
            tags
        });
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDTO: UpdateCourseDTO) {
        const tags = updateCourseDTO.tags && await Promise.all(
            updateCourseDTO.tags.map((name) => {
                return this.preloadTagByName(name);
            })
        )
        const course = await this.courseRepository.preload({ ...updateCourseDTO, tags, id });
        if (!course) throw new NotFoundException(`Unable to perform this action`, { cause: new Error(), description: `Course ID ${id} not found` });
        return this.courseRepository.save(course);
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({ where: { id } });
        if (!course) throw new NotFoundException(`Unable to perform this action`, { cause: new Error(), description: `Course ID ${id} not found` });
        return this.courseRepository.remove(course);
    }

    private async preloadTagByName(name: string): Promise<Tags> {
        const tag = await this.tagRepository.findOne({ where: { name } })
        if (tag) return tag;
        return this.tagRepository.create({ name });
    }
} 
