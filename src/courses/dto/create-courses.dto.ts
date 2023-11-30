import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCourseDTO{
    @ApiProperty({description: "Nome do curso"})
    @IsString()
    name: string
    @ApiProperty({description: "Descrição do curso"})
    @IsString()
    description: string
    @ApiProperty({description: "Tags do curso"})
    @IsString({each: true})
    tags: string[]
}