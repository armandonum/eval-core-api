import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/role.entity';
import { RoleTypeormEntity } from '../typeorm/role.typeorm-entity';
import { RoleMapper } from '../typeorm/role.mapper';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleTypeormEntity)
    private readonly ormRepo: Repository<RoleTypeormEntity>,
  ) {}

  async findById(role_id: number): Promise<Role | null> {
    const orm = await this.ormRepo.findOne({ where: { role_id } });
    return orm ? RoleMapper.toDomain(orm) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const orm = await this.ormRepo.findOne({ where: { name } });
    return orm ? RoleMapper.toDomain(orm) : null;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const orms = await this.ormRepo.find({ where: { role_id: In(ids) } });
    return orms.map(RoleMapper.toDomain);
  }

  async findAll(): Promise<Role[]> {
    const orms = await this.ormRepo.find();
    return orms.map(RoleMapper.toDomain);
  }

  async save(role: Role): Promise<Role> {
    const orm = RoleMapper.toOrm(role);
    const saved = await this.ormRepo.save(orm);
    return RoleMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}