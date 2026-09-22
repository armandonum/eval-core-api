import { DataSource } from 'typeorm';

export async function rolesSeeder(dataSource: DataSource) {
  await dataSource.query(`

  INSERT INTO auth.roles
  (
    code,
    name,
    description,
    is_system_role
  )

  VALUES

  ('administrador','Administrador','Administrador general',true),

  ('coordinador','Coordinador','Coordinador académico',true),

  ('docente','Docente','Docente evaluador',true),

  ('estudiante','Estudiante','Usuario estudiante',true),

  ('experto_ux','Experto UX','Especialista UX',true),

  ('moderador','Moderador','Moderador',true),

  ('observador','Observador','Solo lectura',true),

  ('especialista_ia','Especialista IA','Especialista IA',true),

  ('responsable_etico','Responsable Ético','Responsable Ético',true)

  ON CONFLICT (code)

  DO NOTHING;

  `);
}
