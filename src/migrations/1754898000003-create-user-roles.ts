import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm'

export class CreateUserRoles1754898000003
  implements MigrationInterface
{
  name = 'CreateUserRoles1754898000003'

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      CREATE TABLE auth.user_roles
      (
        user_role_id UUID
        PRIMARY KEY,

        user_id UUID
        NOT NULL,

        role_id SMALLINT
        NOT NULL,

        project_id UUID NULL,

        assigned_by UUID NULL,

        assigned_at TIMESTAMPTZ
        NOT NULL,

        expires_at TIMESTAMPTZ NULL,

        CONSTRAINT fk_user_roles_user
        FOREIGN KEY(user_id)
        REFERENCES auth.users(user_id),

        CONSTRAINT fk_user_roles_role
        FOREIGN KEY(role_id)
        REFERENCES auth.roles(role_id),

        CONSTRAINT fk_user_roles_assigned_by
        FOREIGN KEY(assigned_by)
        REFERENCES auth.users(user_id),

        CONSTRAINT uq_user_role
        UNIQUE(user_id,role_id,project_id)
      );
    `)
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {

    await queryRunner.query(`
      DROP TABLE auth.user_roles;
    `)
  }
}