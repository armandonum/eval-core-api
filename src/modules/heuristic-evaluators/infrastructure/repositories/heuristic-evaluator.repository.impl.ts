import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicEvaluatorRepository } from '../../domain/interfaces/heuristic-evaluator.repository';
import { HeuristicEvaluator } from '../../domain/entities/heuristic-evaluator.entity';
import { HeuristicEvaluatorTypeorm } from '../typeorm/heuristic-evaluator.typeorm.entity';
import { HeuristicEvaluatorMapper } from '../typeorm/heuristic-evaluator.mapper';

@Injectable()
export class HeuristicEvaluatorRepositoryImpl implements HeuristicEvaluatorRepository {
  constructor(
    @InjectRepository(HeuristicEvaluatorTypeorm)
    private readonly repository: Repository<HeuristicEvaluatorTypeorm>,
  ) {}

  async create(evaluator: HeuristicEvaluator): Promise<HeuristicEvaluator> {
    const typeorm = HeuristicEvaluatorMapper.toTypeorm(evaluator);
    const saved = await this.repository.save(typeorm);
    return HeuristicEvaluatorMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicEvaluator[]> {
    const evaluators = await this.repository.find({
      order: { assigned_at: 'DESC' },
    });
    return evaluators.map(HeuristicEvaluatorMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicEvaluator | null> {
    const evaluator = await this.repository.findOne({ where: { id } });
    return evaluator ? HeuristicEvaluatorMapper.toDomain(evaluator) : null;
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicEvaluator[]> {
    const evaluators = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { assigned_at: 'ASC' },
    });
    return evaluators.map(HeuristicEvaluatorMapper.toDomain);
  }

  async findByUser(userId: string): Promise<HeuristicEvaluator[]> {
    const evaluators = await this.repository.find({
      where: { user_id: userId },
      order: { assigned_at: 'DESC' },
    });
    return evaluators.map(HeuristicEvaluatorMapper.toDomain);
  }

  async findByEvaluationAndUser(
    evaluationId: string,
    userId: string,
  ): Promise<HeuristicEvaluator | null> {
    const evaluator = await this.repository.findOne({
      where: { evaluation_id: evaluationId, user_id: userId },
    });
    return evaluator ? HeuristicEvaluatorMapper.toDomain(evaluator) : null;
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({ where: { evaluation_id: evaluationId } });
  }

  async update(id: string, evaluator: Partial<HeuristicEvaluator>): Promise<HeuristicEvaluator> {
    await this.repository.update(id, {
      role: evaluator.role,
      completed_at: evaluator.completedAt,
      notes: evaluator.notes,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { id } });
    return HeuristicEvaluatorMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }
}