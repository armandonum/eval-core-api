import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicFinalResultRepository } from '../../domain/interfaces/heuristic-final-result.repository';
import { HeuristicFinalResult } from '../../domain/entities/heuristic-final-result.entity';
import { HeuristicFinalResultTypeorm } from '../typeorm/heuristic-final-result.typeorm.entity';
import { HeuristicFinalResultMapper } from '../typeorm/heuristic-final-result.mapper';

@Injectable()
export class HeuristicFinalResultRepositoryImpl implements HeuristicFinalResultRepository {
  constructor(
    @InjectRepository(HeuristicFinalResultTypeorm)
    private readonly repository: Repository<HeuristicFinalResultTypeorm>,
  ) {}

  async create(result: HeuristicFinalResult): Promise<HeuristicFinalResult> {
    const typeorm = HeuristicFinalResultMapper.toTypeorm(result);
    const saved = await this.repository.save(typeorm);
    return HeuristicFinalResultMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicFinalResult[]> {
    const results = await this.repository.find({
      order: { calculated_at: 'DESC' },
    });
    return results.map(HeuristicFinalResultMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicFinalResult | null> {
    const result = await this.repository.findOne({ where: { result_id: id } });
    return result ? HeuristicFinalResultMapper.toDomain(result) : null;
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicFinalResult | null> {
    const result = await this.repository.findOne({
      where: { evaluation_id: evaluationId },
    });
    return result ? HeuristicFinalResultMapper.toDomain(result) : null;
  }

  async update(id: string, result: Partial<HeuristicFinalResult>): Promise<HeuristicFinalResult> {
    await this.repository.update(id, {
      total_problems: result.totalProblems,
      total_positive_aspects: result.totalPositiveAspects,
      total_evaluators: result.totalEvaluators,
      completed_evaluators: result.completedEvaluators,
      ranking_json: result.rankingJson,
      critical_problems: result.criticalProblems,
      recommendations: result.recommendations,
      avg_severity: result.avgSeverity,
      avg_frequency: result.avgFrequency,
      avg_criticality: result.avgCriticality,
      status: result.status,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { result_id: id } });
    return HeuristicFinalResultMapper.toDomain(updated!);
  }

  async upsert(evaluationId: string, result: HeuristicFinalResult): Promise<HeuristicFinalResult> {
    const existing = await this.findByEvaluation(evaluationId);
    if (existing) {
      return this.update(existing.resultId, result);
    }
    return this.create(result);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }
}