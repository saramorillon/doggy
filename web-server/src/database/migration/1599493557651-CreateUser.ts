import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUser1599493557651 implements MigrationInterface {
  name = 'CreateUser1599493557651'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar NOT NULL)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
