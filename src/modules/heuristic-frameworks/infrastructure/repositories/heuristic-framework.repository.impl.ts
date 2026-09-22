import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicFrameworkRepository } from '../../domain/interfaces/heuristic-framework.repository';
import { HeuristicFramework } from '../../domain/entities/heuristic-framework.entity';
import { HeuristicFrameworkTypeorm } from '../typeorm/heuristic-framework.typeorm.entity';
import { HeuristicFrameworkMapper } from '../typeorm/heuristic-framework.mapper';

@Injectable()
export class HeuristicFrameworkRepositoryImpl implements HeuristicFrameworkRepository {
  constructor(
    @InjectRepository(HeuristicFrameworkTypeorm)
    private readonly repository: Repository<HeuristicFrameworkTypeorm>,
  ) {}

  async create(framework: HeuristicFramework): Promise<HeuristicFramework> {
    const typeorm = HeuristicFrameworkMapper.toTypeorm(framework);
    const saved = await this.repository.save(typeorm);
    return HeuristicFrameworkMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicFramework[]> {
    const frameworks = await this.repository.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
    return frameworks.map(HeuristicFrameworkMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicFramework | null> {
    const framework = await this.repository.findOne({ where: { framework_id: id } });
    return framework ? HeuristicFrameworkMapper.toDomain(framework) : null;
  }

  async findByName(name: string): Promise<HeuristicFramework | null> {
    const framework = await this.repository.findOne({ where: { name } });
    return framework ? HeuristicFrameworkMapper.toDomain(framework) : null;
  }

  async update(id: string, framework: Partial<HeuristicFramework>): Promise<HeuristicFramework> {
    await this.repository.update(id, {
      name: framework.name,
      description: framework.description,
      author: framework.author,
      year: framework.year,
      is_active: framework.isActive,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { framework_id: id } });
    return HeuristicFrameworkMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}