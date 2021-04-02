import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSkillsUsers1617390214170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'skills_users',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'skill_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_SkillUser',
            referencedTableName: 'skills',
            referencedColumnNames: ['id'],
            columnNames: ['skill_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_UserSkill',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('skills_users');
  }
}
