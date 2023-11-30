import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddTagsIdToCoursesTagsTable1701353020873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tb_courses_tags', new TableColumn({
            name: 'tbTagsId',
            type: 'uuid',
            isNullable: true
        }))
        await queryRunner.createForeignKey('tb_courses_tags', new TableForeignKey({
            name: 'tb_tags_courses_tags',
            columnNames: ['tbTagsId'],
            referencedTableName: 'tb_tags',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_courses_tags', 'tb_tags_courses_tags');
        await queryRunner.dropColumn('tb_courses_tags', 'tbTagsId');
    }

}
