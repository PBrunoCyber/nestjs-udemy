import { PartialType } from "@nestjs/swagger"
import { CreateCourseDTO } from "./create-courses.dto"

export class UpdateCourseDTO extends PartialType(CreateCourseDTO){}