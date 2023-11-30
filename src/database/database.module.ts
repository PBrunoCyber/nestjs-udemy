import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/entities/courses.entity';
import { DataSourceOptions } from 'typeorm';
import { Tags } from '../courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pb2588',
    database: 'nestjs_udemy',
    entities: [Course, Tags],
    synchronize: false,
}

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: ()=> {
            return {
                ...dataSourceOptions
            }
        }
    })]
})
export class DatabaseModule {}
