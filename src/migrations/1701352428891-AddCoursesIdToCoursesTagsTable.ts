import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddCoursesIdToCoursesTagsTable1701352428891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tb_courses_tags', new TableColumn({
            name: 'tbCoursesId',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('tb_courses_tags', new TableForeignKey({
            name: 'tb_courses_tags_courses',
            columnNames: ['tbCoursesId'],
            referencedTableName: 'tb_courses',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_courses_tags', 'tb_courses_tags_courses');
        await queryRunner.dropColumn('tb_courses_tags', 'tbCoursesId');
    }

}
