import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicEvaluationRepository } from '../../domain/interfaces/heuristic-evaluation.repository';
import { HeuristicEvaluation } from '../../domain/entities/heuristic-evaluation.entity';
import { HeuristicEvaluationTypeorm } from '../typeorm/heuristic-evaluation.typeorm.entity';
import { HeuristicEvaluationMapper } from '../typeorm/heuristic-evaluation.mapper';

@Injectable()
export class HeuristicEvaluationRepositoryImpl implements HeuristicEvaluationRepository {
  constructor(
    @InjectRepository(HeuristicEvaluationTypeorm)
    private readonly repository: Repository<HeuristicEvaluationTypeorm>,
  ) {}

  async create(evaluation: HeuristicEvaluation): Promise<HeuristicEvaluation> {
    const typeorm = HeuristicEvaluationMapper.toTypeorm(evaluation);
    const saved = await this.repository.save(typeorm);
    return HeuristicEvaluationMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicEvaluation[]> {
    const evaluations = await this.repository.find({
      order: { created_at: 'DESC' },
    });
    return evaluations.map(HeuristicEvaluationMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicEvaluation | null> {
    const evaluation = await this.repository.findOne({
      where: { evaluation_id: id },
    });
    return evaluation ? HeuristicEvaluationMapper.toDomain(evaluation) : null;
  }

  async findBySupervisor(supervisorId: string): Promise<HeuristicEvaluation[]> {
    const evaluations = await this.repository.find({
      where: { supervisor_id: supervisorId },
      order: { created_at: 'DESC' },
    });
    return evaluations.map(HeuristicEvaluationMapper.toDomain);
  }

  async findByProject(projectId: string): Promise<HeuristicEvaluation[]> {
    const evaluations = await this.repository.find({
      where: { project_id: projectId },
      order: { created_at: 'DESC' },
    });
    return evaluations.map(HeuristicEvaluationMapper.toDomain);
  }

  async update(id: string, evaluation: Partial<HeuristicEvaluation>): Promise<HeuristicEvaluation> {
    await this.repository.update(id, {
      name: evaluation.name,
      description: evaluation.description,
      status: evaluation.status,
      system_description: evaluation.systemDescription,
      target_user_description: evaluation.targetUserDescription,
      max_duration_minutes: evaluation.maxDurationMinutes,
      started_at: evaluation.startedAt,
      completed_at: evaluation.completedAt,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { evaluation_id: id } });
    return HeuristicEvaluationMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}