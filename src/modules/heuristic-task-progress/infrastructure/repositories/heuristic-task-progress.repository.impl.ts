import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicTaskProgressRepository } from '../../domain/interfaces/heuristic-task-progress.repository';
import { HeuristicTaskProgress } from '../../domain/entities/heuristic-task-progress.entity';
import { HeuristicTaskProgressTypeorm } from '../typeorm/heuristic-task-progress.typeorm.entity';
import { HeuristicTaskProgressMapper } from '../typeorm/heuristic-task-progress.mapper';

@Injectable()
export class HeuristicTaskProgressRepositoryImpl
  implements HeuristicTaskProgressRepository
{
  constructor(
    @InjectRepository(HeuristicTaskProgressTypeorm)
    private readonly repository: Repository<HeuristicTaskProgressTypeorm>,
  ) {}

  async create(progress: HeuristicTaskProgress): Promise<HeuristicTaskProgress> {
    const typeorm = HeuristicTaskProgressMapper.toTypeorm(progress);
    const saved = await this.repository.save(typeorm);
    return HeuristicTaskProgressMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicTaskProgress[]> {
    const results = await this.repository.find({
      order: { created_at: 'DESC' },
    });
    return results.map(HeuristicTaskProgressMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicTaskProgress | null> {
    const result = await this.repository.findOne({
      where: { progress_id: id },
    });
    return result ? HeuristicTaskProgressMapper.toDomain(result) : null;
  }

  async findByEvaluator(evaluatorId: string): Promise<HeuristicTaskProgress[]> {
    const results = await this.repository.find({
      where: { evaluator_id: evaluatorId },
      order: { created_at: 'DESC' },
    });
    return results.map(HeuristicTaskProgressMapper.toDomain);
  }

  async findByTask(taskId: string): Promise<HeuristicTaskProgress[]> {
    const results = await this.repository.find({
      where: { task_id: taskId },
      order: { created_at: 'ASC' },
    });
    return results.map(HeuristicTaskProgressMapper.toDomain);
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicTaskProgress[]> {
    const results = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { created_at: 'DESC' },
    });
    return results.map(HeuristicTaskProgressMapper.toDomain);
  }

  async findBySession(sessionId: string): Promise<HeuristicTaskProgress[]> {
    const results = await this.repository.find({
      where: { session_id: sessionId },
      order: { created_at: 'DESC' },
    });
    return results.map(HeuristicTaskProgressMapper.toDomain);
  }

  async findByEvaluationAndEvaluator(
    evaluationId: string,
    evaluatorId: string,
  ): Promise<HeuristicTaskProgress[]> {
    const results = await this.repository.find({
      where: {
        evaluation_id: evaluationId,
        evaluator_id: evaluatorId,
      },
      order: { created_at: 'ASC' },
    });
    return results.map(HeuristicTaskProgressMapper.toDomain);
  }

  async findByEvaluatorAndTask(
    evaluatorId: string,
    taskId: string,
  ): Promise<HeuristicTaskProgress | null> {
    const result = await this.repository.findOne({
      where: {
        evaluator_id: evaluatorId,
        task_id: taskId,
      },
    });
    return result ? HeuristicTaskProgressMapper.toDomain(result) : null;
  }

  async upsert(progress: HeuristicTaskProgress): Promise<HeuristicTaskProgress> {
    const existing = await this.findByEvaluatorAndTask(
      progress.evaluatorId,
      progress.taskId,
    );

    if (existing) {
      return this.update(existing.progressId, progress);
    }

    return this.create(progress);
  }

  async update(
    id: string,
    progress: Partial<HeuristicTaskProgress>,
  ): Promise<HeuristicTaskProgress> {
    await this.repository.update(id, {
      status: progress.status,
      started_at: progress.startedAt,
      completed_at: progress.completedAt,
      session_id: progress.sessionId,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({
      where: { progress_id: id },
    });
    return HeuristicTaskProgressMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  async deleteByEvaluator(evaluatorId: string): Promise<void> {
    await this.repository.delete({ evaluator_id: evaluatorId });
  }

  async deleteByTask(taskId: string): Promise<void> {
    await this.repository.delete({ task_id: taskId });
  }
}