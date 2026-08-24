import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokens1754898000005 implements MigrationInterface {
  name = 'CreateRefreshTokens1754898000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE auth.refresh_tokens
      (
        refresh_token_id UUID
        PRIMARY KEY,
        user_id UUID
        NOT NULL,
        token_hash TEXT
        NOT NULL,

        issued_at TIMESTAMPTZ
        NOT NULL,

        expires_at TIMESTAMPTZ
        NOT NULL,

        revoked_at TIMESTAMPTZ NULL,

        ip_address INET NULL,

        user_agent TEXT NULL,

        CONSTRAINT fk_refresh_user
        FOREIGN KEY(user_id)
        REFERENCES auth.users(user_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE auth.refresh_tokens;
    `);
  }
}
