import { User } from '../../domain/entities/user.entity';
import { UserTypeormEntity } from './user.typeorm-entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { RoleMapper } from '../../../roles/infrastructure/typeorm/role.mapper';


export class UserMapper {
  static toDomain(orm: UserTypeormEntity): User {
    // Constructor de User:
    // (id, institutionId, email, passwordHash, displayName, status, last_login_at, roles, createdAt, updatedAt)
    return new User(
      orm.user_id,
      orm.created_by,
      new Email(orm.email!),
      orm.password_hash ?? '',
      orm.display_name ?? '',
      orm.status ?? 'active',
      orm.last_login_at ?? null,
      (orm.roles ?? []).map(RoleMapper.toDomain),
      orm.created_at!,
      orm.updated_at!,
    );
  }

static toOrm(domain: User): UserTypeormEntity {
  const orm = new UserTypeormEntity();

  if (domain.user_id) orm.user_id = domain.user_id;

  orm.created_by = domain.created_by;
  orm.email = domain._email;
  orm.password_hash = domain.password_hash;
  orm.display_name = domain.display_name;
  orm.status = domain.status;
  orm.last_login_at = domain.last_login_at;
  

  orm.roles = domain.roles.map(RoleMapper.toOrm);

  return orm;
}
}