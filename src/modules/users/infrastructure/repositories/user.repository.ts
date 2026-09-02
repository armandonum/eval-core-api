import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserTypeormEntity } from '../typeorm/user.typeorm-entity';
import { UserMapper } from '../typeorm/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly ormRepo: Repository<UserTypeormEntity>,
  ) {}

  async findById(user_id: string): Promise<User | null> {
    const orm = await this.ormRepo.findOne({
      where: {user_id},
      relations: {
        roles: true,
      },
    });

    return orm ? UserMapper.toDomain(orm) : null;
  }



  async findByEmail(email: string): Promise<User | null> {
    const orm = await this.ormRepo.findOne({
      where: { email: email.toLowerCase() },
      relations: {
        roles: true,
      },
    });
    return orm ? UserMapper.toDomain(orm) : null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.ormRepo.count({
      where: { email: email.toLowerCase() },
    });
    return count > 0;
  }

  async findAll(): Promise<User[]> {
    const orms = await this.ormRepo.find({
      relations: {
        roles: true,
      },
    });
    return orms.map(UserMapper.toDomain);
  }

  async save(user: User): Promise<User> {
    const orm = UserMapper.toOrm(user);
    const saved = await this.ormRepo.save(orm);
    // Reload with relations
    const full = await this.ormRepo.findOne({
      where: { user_id: saved.user_id },
      relations: {
        roles: true,
      },
    });
    return UserMapper.toDomain(full!);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }  
  
  async getByCreator(created_by: string): Promise<User[]> {
    const orm = await this.ormRepo.find({
      where: {created_by},
      relations: {
        roles: true,
      },
    });

    return orm.map(UserMapper.toDomain)
  }
}
