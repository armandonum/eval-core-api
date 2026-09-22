import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicRatingRepository } from '../../domain/interfaces/heuristic-rating.repository';
import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';
import { HeuristicRatingTypeorm } from '../typeorm/heuristic-rating.typeorm.entity';
import { HeuristicRatingMapper } from '../typeorm/heuristic-rating.mapper';

@Injectable()
export class HeuristicRatingRepositoryImpl implements HeuristicRatingRepository {
  constructor(
    @InjectRepository(HeuristicRatingTypeorm)
    private readonly repository: Repository<HeuristicRatingTypeorm>,
  ) {}

  async create(rating: HeuristicRating): Promise<HeuristicRating> {
    const typeorm = HeuristicRatingMapper.toTypeorm(rating);
    const saved = await this.repository.save(typeorm);
    return HeuristicRatingMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicRating[]> {
    const ratings = await this.repository.find({
      order: { created_at: 'DESC' },
    });
    return ratings.map(HeuristicRatingMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicRating | null> {
    const rating = await this.repository.findOne({ where: { rating_id: id } });
    return rating ? HeuristicRatingMapper.toDomain(rating) : null;
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicRating[]> {
    const ratings = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { created_at: 'DESC' },
    });
    return ratings.map(HeuristicRatingMapper.toDomain);
  }

  async findByObservation(problemId: string): Promise<HeuristicRating[]> {
    const ratings = await this.repository.find({
      where: { problem_id: problemId },
      order: { created_at: 'ASC' },
    });
    return ratings.map(HeuristicRatingMapper.toDomain);
  }

  async findBySession(sessionId: string): Promise<HeuristicRating[]> {
    const ratings = await this.repository.find({
      where: { session_id: sessionId },
      order: { created_at: 'DESC' },
    });
    return ratings.map(HeuristicRatingMapper.toDomain);
  }

  async findByEvaluator(evaluatorId: string): Promise<HeuristicRating[]> {
    const ratings = await this.repository.find({
      where: { evaluator_id: evaluatorId },
      order: { created_at: 'DESC' },
    });
    return ratings.map(HeuristicRatingMapper.toDomain);
  }

  async findByEvaluationAndObservation(
    evaluationId: string,
    problemId: string,
  ): Promise<HeuristicRating[]> {
    const ratings = await this.repository.find({
      where: { evaluation_id: evaluationId, problem_id: problemId },
      order: { created_at: 'ASC' },
    });
    return ratings.map(HeuristicRatingMapper.toDomain);
  }

  async findExistingRating(
    evaluationId: string,
    evaluatorId: string,
    problemId: string,
  ): Promise<HeuristicRating | null> {
    const rating = await this.repository.findOne({
      where: {
        evaluation_id: evaluationId,
        evaluator_id: evaluatorId,
        problem_id: problemId,
      },
    });
    return rating ? HeuristicRatingMapper.toDomain(rating) : null;
  }

  async update(id: string, rating: Partial<HeuristicRating>): Promise<HeuristicRating> {
    await this.repository.update(id, {
      severity: rating.severity,
      frequency: rating.frequency,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({ where: { rating_id: id } });
    return HeuristicRatingMapper.toDomain(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  async deleteByObservation(problemId: string): Promise<void> {
    await this.repository.delete({ problem_id: problemId });
  }
}