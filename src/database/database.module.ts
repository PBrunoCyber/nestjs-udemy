import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/entities/courses.entity';
import { Tags } from '../courses/entities/tags.entity';
import { ConfigService } from '@nestjs/config';



@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => {
            return {
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: Number(configService.get('DB_PORT')),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASS'),
                database: configService.get('DB_NAME'),
                entities: [Course, Tags],
                synchronize: false,
            }
        },
        inject: [ConfigService]
    })]
})
export class DatabaseModule { }
