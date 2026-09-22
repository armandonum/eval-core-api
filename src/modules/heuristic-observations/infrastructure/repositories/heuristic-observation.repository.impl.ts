import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeuristicObservationRepository } from '../../domain/interfaces/heuristic-observation.repository';
import { HeuristicObservation } from '../../domain/entities/heuristic-observation.entity';
import { HeuristicObservationTypeorm } from '../typeorm/heuristic-observation.typeorm.entity';
import { HeuristicObservationMapper } from '../typeorm/heuristic-observation.mapper';

@Injectable()
export class HeuristicObservationRepositoryImpl
  implements HeuristicObservationRepository
{
  constructor(
    @InjectRepository(HeuristicObservationTypeorm)
    private readonly repository: Repository<HeuristicObservationTypeorm>,
  ) {}

  async create(observation: HeuristicObservation): Promise<HeuristicObservation> {
    const typeorm = HeuristicObservationMapper.toTypeorm(observation);
    const saved = await this.repository.save(typeorm);
    return HeuristicObservationMapper.toDomain(saved);
  }

  async findAll(): Promise<HeuristicObservation[]> {
    const observations = await this.repository.find({
      order: { created_at: 'DESC' },
    });
    return observations.map(HeuristicObservationMapper.toDomain);
  }

  async findById(id: string): Promise<HeuristicObservation | null> {
    const observation = await this.repository.findOne({
      where: { observation_id: id },
    });
    return observation ? HeuristicObservationMapper.toDomain(observation) : null;
  }

  async findByEvaluation(evaluationId: string): Promise<HeuristicObservation[]> {
    const observations = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { created_at: 'DESC' },
    });
    return observations.map(HeuristicObservationMapper.toDomain);
  }

  async findBySession(sessionId: string): Promise<HeuristicObservation[]> {
    const observations = await this.repository.find({
      where: { session_id: sessionId },
      order: { created_at: 'ASC' },
    });
    return observations.map(HeuristicObservationMapper.toDomain);
  }

  async findByPrinciple(principleId: string): Promise<HeuristicObservation[]> {
    const observations = await this.repository.find({
      where: { principle_id: principleId },
      order: { created_at: 'DESC' },
    });
    return observations.map(HeuristicObservationMapper.toDomain);
  }

  async findByEvaluator(evaluatorId: string): Promise<HeuristicObservation[]> {
    const observations = await this.repository.find({
      where: { evaluator_id: evaluatorId },
      order: { created_at: 'DESC' },
    });
    return observations.map(HeuristicObservationMapper.toDomain);
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({ where: { evaluation_id: evaluationId } });
  }

  async update(
    id: string,
    observation: Partial<HeuristicObservation>,
  ): Promise<HeuristicObservation> {
    await this.repository.update(id, {
      description: observation.description,
      severity: observation.severity,
      frequency: observation.frequency,
      recommendation: observation.recommendation,
      node_id: observation.nodeId,
      screen_identifier: observation.screenIdentifier,
      updated_at: new Date(),
    });
    const updated = await this.repository.findOne({
      where: { observation_id: id },
    });
    return HeuristicObservationMapper.toDomain(updated!);
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