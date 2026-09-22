import { Role } from '../entities/role.entity';
import { IBaseRepository } from '../../../../shared/interfaces/base-repository.interface';

export interface IRoleRepository extends IBaseRepository<Role> {
  findByName(name: string): Promise<Role | null>;
  findByIds(ids: string[]): Promise<Role[]>;
}