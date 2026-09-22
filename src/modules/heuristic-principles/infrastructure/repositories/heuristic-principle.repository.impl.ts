import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicPrincipleRepository } from '../../domain/interfaces/heuristic-principle.repository';
import { HeuristicPrinciple } from '../../domain/entities/heuristic-principle.entity';
import { HeuristicPrincipleTypeorm } from '../typeorm/heuristic-principle.typeorm.entity';
import { HeuristicPrincipleMapper } from '../typeorm/heuristic-principle.mapper';

@Injectable()
export class HeuristicPrincipleRepositoryImpl implements HeuristicPrincipleRepository {
  constructor(
    @InjectRepository(HeuristicPrincipleTypeorm)
    private readonly repository: Repository<HeuristicPrincipleTypeorm>,
  ) {}

  async create(principle: HeuristicPrinciple): Promise<HeuristicPrinciple> {
    const typeorm = HeuristicPrincipleMapper.toTypeorm(principle);
    const saved = await this.repository.save(typeorm);
    return HeuristicPrincipleMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicPrinciple[]> {
    const principles = await this.repository.find({
      order: { order_index: 'ASC' },
    });
    return principles.map(HeuristicPrincipleMapper.toDomain);
  }

  async findAllByFramework(frameworkId: string): Promise<HeuristicPrinciple[]> {
    const principles = await this.repository.find({
      where: { framework_id: frameworkId, is_active: true },
      order: { order_index: 'ASC' },
    });
    return principles.map(HeuristicPrincipleMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicPrinciple | null> {
    const principle = await this.repository.findOne({ where: { principle_id: id } });
    return principle ? HeuristicPrincipleMapper.toDomain(principle) : null;
  }

  async findByCodeAndFramework(
    code: string,
    frameworkId: string,
  ): Promise<HeuristicPrinciple | null> {
    const principle = await this.repository.findOne({
      where: { code, framework_id: frameworkId },
    });
    return principle ? HeuristicPrincipleMapper.toDomain(principle) : null;
  }

  async update(id: string, principle: Partial<HeuristicPrinciple>): Promise<HeuristicPrinciple> {
    await this.repository.update(id, {
      code: principle.code,
      name: principle.name,
      description: principle.description,
      order_index: principle.orderIndex,
      is_active: principle.isActive,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { principle_id: id } });
    return HeuristicPrincipleMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByFramework(frameworkId: string): Promise<void> {
    await this.repository.delete({ framework_id: frameworkId });
  }
}