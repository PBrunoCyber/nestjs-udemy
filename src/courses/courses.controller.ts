import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-courses.dto';
import { UpdateCourseDTO } from './dto/update-courses.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesServices: CoursesService){}

    @Get()
    findAll() {
        return this.coursesServices.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.coursesServices.findOne(id);
    }
    
    @Post()
    create(@Body() body: CreateCourseDTO){
        return this.coursesServices.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateCourseDTO){
        return this.coursesServices.update(id, body);
    }

    // @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coursesServices.remove(id);
    } 
}
