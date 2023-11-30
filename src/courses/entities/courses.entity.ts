import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tags } from "./tags.entity"
import { randomUUID } from "crypto"

@Entity({name: 'tb_courses'})
export class Course{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string
    @Column()
    description: string
    
    @JoinTable({name: 'tb_courses_tags'}) 
    @ManyToMany(()=> Tags, tag => tag.courses, {
        cascade: true
    })
    tags: Tags[]

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @BeforeInsert()
    generatedId(){
        if(this.id) return;
        this.id = randomUUID();
    }
}