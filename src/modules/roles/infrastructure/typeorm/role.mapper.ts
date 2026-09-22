import { Role } from '../../domain/entities/role.entity';
import { RoleTypeormEntity } from './role.typeorm-entity';

export class RoleMapper {
  static toDomain(orm: RoleTypeormEntity): Role {
    return new Role(
      orm.role_id,
      orm.code,
      orm.name ?? '',
      orm.description ?? '',

    );
  }


  static toOrm(domain: Role): RoleTypeormEntity {
  const orm = new RoleTypeormEntity();

  orm.role_id = domain.role_id;
  orm.code = domain.code;
  orm.name = domain.name;
  orm.description = domain.description;

  return orm;
}
}