import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm'

export default class CreateActivities1611357555035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activities',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'schedule',
            type: 'date',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'patient_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
        ],
      }),
    )
    await queryRunner.createForeignKey('activities', new TableForeignKey({
      name: 'ActivityOwner',
      columnNames: ['patient_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'patients',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activities')
  }
}
