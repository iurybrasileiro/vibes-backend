import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class Main1730835517369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pg_trgm"')
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION IF EXISTS "fuzzystrmatch"')
    await queryRunner.query('DROP EXTENSION IF EXISTS "pg_trgm"')
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
