// src/modules/semesters/infrastructure/repositories/semester.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterTypeOrmEntity } from '../typeorm/semester.typeorm.entity';
import { ISemesterRepository } from '../../domain/interfaces/semester-repository.interface';
import { Semester } from '../../domain/entities/semester.entity';

@Injectable()
export class SemesterRepository implements ISemesterRepository {
  constructor(
    @InjectRepository(SemesterTypeOrmEntity)
    private readonly repository: Repository<SemesterTypeOrmEntity>,
  ) {}

  async create(data: Omit<Semester, 'semesterId' | 'createdAt' | 'updatedAt'>): Promise<Semester> {
    const entity = this.repository.create({
      name: data.name,
      code: data.code,
      startDate: data.startDate,
      endDate: data.endDate,
      isActive: data.isActive,
    });

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Semester[]> {
    const entities = await this.repository.find({
      order: { startDate: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Semester | null> {
    const entity = await this.repository.findOne({
      where: { semester_id: id },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findActive(): Promise<Semester | null> {
    const entity = await this.repository.findOne({
      where: { isActive: true },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findByCode(code: string): Promise<Semester | null> {
    const entity = await this.repository.findOne({
      where: { code },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: string, data: Partial<Semester>): Promise<Semester | null> {
    const result = await this.repository.update(
      { semester_id: id },
      {
        name: data.name,
        code: data.code,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        updatedAt: new Date(),
      },
    );

    if (result.affected === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ semester_id: id });
    return result.affected > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { semester_id: id },
    });
    return count > 0;
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  private toDomain(entity: SemesterTypeOrmEntity): Semester {
    return new Semester({
      semesterId: entity.semester_id,
      name: entity.name,
      code: entity.code,
      startDate: entity.startDate,
      endDate: entity.endDate,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}