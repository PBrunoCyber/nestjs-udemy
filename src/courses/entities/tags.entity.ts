import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./courses.entity";
import { randomUUID } from "crypto";

@Entity({name: 'tb_tags'})
export class Tags{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(()=> Course, course => course.tags)
    courses: Course[]

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @BeforeInsert()
    generatedId(){
        if(this.id) return;
        this.id = randomUUID();
    }
}