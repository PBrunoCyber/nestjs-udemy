import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1701350327784 } from "../migrations/1701350327784-CreateCoursesTable";
import { CreateTagsTable1701350963219 } from "../migrations/1701350963219-CreateTagsTable";
import { CreateCoursesTagsTable1701352021826 } from "../migrations/1701352021826-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1701352428891 } from "../migrations/1701352428891-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1701353020873 } from "src/migrations/1701353020873-AddTagsIdToCoursesTagsTable";
import { Course } from "../courses/entities/courses.entity";
import { Tags } from "../courses/entities/tags.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tags],
    synchronize: false,
}

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [
        CreateCoursesTable1701350327784, 
        CreateTagsTable1701350963219,
        CreateCoursesTagsTable1701352021826,
        AddCoursesIdToCoursesTagsTable1701352428891,
        AddTagsIdToCoursesTagsTable1701353020873
    ]
})
 