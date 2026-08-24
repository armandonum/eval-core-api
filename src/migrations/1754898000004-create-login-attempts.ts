import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm'

export class CreateLoginAttempts1754898000004
  implements MigrationInterface
{
  name = 'CreateLoginAttempts1754898000004'

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      CREATE TABLE auth.login_attempts
      (
        login_attempt_id UUID
        PRIMARY KEY,

        user_id UUID NULL,

        email VARCHAR(254)
        NOT NULL,

        ip_address INET
        NOT NULL,

        user_agent TEXT NULL,

        is_success BOOLEAN
        NOT NULL,

        failure_reason VARCHAR(100)
        NULL,

        attempted_at TIMESTAMPTZ
        NOT NULL,

        CONSTRAINT fk_login_user
        FOREIGN KEY(user_id)
        REFERENCES auth.users(user_id)
      );
    `)
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
console.log("logina appten")
    await queryRunner.query(`
      DROP TABLE auth.login_attempts;
    `)
  }
}