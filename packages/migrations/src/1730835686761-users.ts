import { Table, type MigrationInterface, type QueryRunner } from 'typeorm'

export class Users1730835686761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'bio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'profile_picture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cover_picture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'visibility',
            type: 'enum',
            enum: ['public', 'private'],
            enumName: 'visibility',
          },
          {
            name: 'verificated',
            type: 'boolean',
            default: false,
          },
          {
            name: 'verification_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'verification_code_expires_in',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'reset_password_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reset_password_code_expires_in',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
