import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm'

export class CreateUsers1754898000001
  implements MigrationInterface
{
  name = 'CreateUsers1754898000001'

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      CREATE TABLE auth.users
      (
        user_id UUID PRIMARY KEY,

        institution_id UUID NULL,

        email VARCHAR(254)
        NOT NULL UNIQUE,

        password_hash TEXT NULL,

        display_name VARCHAR(160)
        NOT NULL,

        status VARCHAR(20)
        NOT NULL,

        last_login_at TIMESTAMPTZ NULL,

        created_at TIMESTAMPTZ
        NOT NULL,

        updated_at TIMESTAMPTZ
        NOT NULL
      );
    `)
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      DROP TABLE auth.users;
    `)
  }
}