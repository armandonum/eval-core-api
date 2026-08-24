import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function usersSeeder(dataSource: DataSource) {
  const password = await bcrypt.hash('Admin123*', 12)

  const users = [
    {
      email: 'admin@uxlab.com',
      displayName: 'Administrador General',
      role: 'administrador',
    },
    {
      email: 'coordinador@uxlab.com',
      displayName: 'Coordinador Académico',
      role: 'coordinador',
    },
    {
      email: 'docente@uxlab.com',
      displayName: 'Docente Demo',
      role: 'docente',
    },
    {
      email: 'estudiante@uxlab.com',
      displayName: 'Estudiante Demo',
      role: 'estudiante',
    },
    {
      email: 'ux@uxlab.com',
      displayName: 'Experto UX',
      role: 'experto_ux',
    },
    {
      email: 'moderador@uxlab.com',
      displayName: 'Moderador',
      role: 'moderador',
    },
    {
      email: 'observador@uxlab.com',
      displayName: 'Observador',
      role: 'observador',
    },
    {
      email: 'ia@uxlab.com',
      displayName: 'Especialista IA',
      role: 'especialista_ia',
    },
    {
      email: 'etico@uxlab.com',
      displayName: 'Responsable Ético',
      role: 'responsable_etico',
    },
  ]

  for (const user of users) {
    const userId = uuid()

    await dataSource.query(
      `
      INSERT INTO auth.users
      (
        user_id,
        email,
        password_hash,
        display_name,
        status,
        created_at,
        updated_at
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        'active',
        NOW(),
        NOW()
      )
      ON CONFLICT (email)
      DO NOTHING;
      `,
      [userId, user.email, password, user.displayName],
    )

    await dataSource.query(
      `
      INSERT INTO auth.user_roles
      (
        user_role_id,
        user_id,
        role_id,
        assigned_at
      )
      SELECT
        gen_random_uuid(),
        u.user_id,
        r.role_id,
        NOW()
      FROM auth.users u
      JOIN auth.roles r
        ON r.code = $2
      WHERE u.email = $1
      ON CONFLICT DO NOTHING;
      `,
      [user.email, user.role],
    )
  }
}