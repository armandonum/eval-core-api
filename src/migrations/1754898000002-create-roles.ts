import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm'

export class CreateRoles1754898000002
  implements MigrationInterface
{
  name = 'CreateRoles1754898000002'

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      CREATE TABLE auth.roles
      (
        role_id SMALLSERIAL
        PRIMARY KEY,

        code VARCHAR(40)
        UNIQUE
        NOT NULL,

        name VARCHAR(100)
        NOT NULL,

        description TEXT NULL,

        is_system_role BOOLEAN
        NOT NULL
      );
    `)
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      DROP TABLE auth.roles;
    `)
  }
}