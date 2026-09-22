import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicPositiveAspectRepository } from '../../domain/interfaces/heuristic-positive-aspect.repository';
import { HeuristicPositiveAspect } from '../../domain/entities/heuristic-positive-aspect.entity';
import { HeuristicPositiveAspectTypeorm } from '../typeorm/heuristic-positive-aspect.typeorm.entity';
import { HeuristicPositiveAspectMapper } from '../typeorm/heuristic-positive-aspect.mapper';

@Injectable()
export class HeuristicPositiveAspectRepositoryImpl
  implements HeuristicPositiveAspectRepository
{
  constructor(
    @InjectRepository(HeuristicPositiveAspectTypeorm)
    private readonly repository: Repository<HeuristicPositiveAspectTypeorm>,
  ) {}

  async create(aspect: HeuristicPositiveAspect): Promise<HeuristicPositiveAspect> {
    const typeorm = HeuristicPositiveAspectMapper.toTypeorm(aspect);
    const saved = await this.repository.save(typeorm);
    return HeuristicPositiveAspectMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicPositiveAspect[]> {
    const aspects = await this.repository.find({
      order: { created_at: 'DESC' },
    });
    return aspects.map(HeuristicPositiveAspectMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicPositiveAspect | null> {
    const aspect = await this.repository.findOne({ where: { aspect_id: id } });
    return aspect ? HeuristicPositiveAspectMapper.toDomain(aspect) : null;
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicPositiveAspect[]> {
    const aspects = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { created_at: 'DESC' },
    });
    return aspects.map(HeuristicPositiveAspectMapper.toDomain);
  }

  async findBySession(sessionId: string): Promise<HeuristicPositiveAspect[]> {
    const aspects = await this.repository.find({
      where: { session_id: sessionId },
      order: { created_at: 'ASC' },
    });
    return aspects.map(HeuristicPositiveAspectMapper.toDomain);
  }

  async findByEvaluator(evaluatorId: string): Promise<HeuristicPositiveAspect[]> {
    const aspects = await this.repository.find({
      where: { evaluator_id: evaluatorId },
      order: { created_at: 'DESC' },
    });
    return aspects.map(HeuristicPositiveAspectMapper.toDomain);
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({ where: { evaluation_id: evaluationId } });
  }

  async update(
    id: string,
    aspect: Partial<HeuristicPositiveAspect>,
  ): Promise<HeuristicPositiveAspect> {
    await this.repository.update(id, {
      description: aspect.description,
    });
    const updated = await this.repository.findOne({ where: { aspect_id: id } });
    return HeuristicPositiveAspectMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await this.repository.delete({ session_id: sessionId });
  }
}