// infrastructure/repositories/cognitive-evaluation.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICognitiveEvaluationRepository } from '../../domain/interfaces/cognitive-evaluation.repository';
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { CognitiveEvaluationOrmEntity } from '../typeorm/cognitive-evaluation.orm-entity';
import { CognitiveEvaluationMapper } from '../typeorm/cognitive-evaluation.mapper';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';

@Injectable()
export class CognitiveEvaluationRepository implements ICognitiveEvaluationRepository {
  constructor(
    @InjectRepository(CognitiveEvaluationOrmEntity)
    private readonly repository: Repository<CognitiveEvaluationOrmEntity>,
  ) {}

  async create(evaluation: CognitiveEvaluation): Promise<CognitiveEvaluation> {
    const orm = CognitiveEvaluationMapper.toPersistence(evaluation);
    const saved = await this.repository.save(orm as CognitiveEvaluationOrmEntity);
    return CognitiveEvaluationMapper.toDomain(saved);
  }

  async update(evaluation: CognitiveEvaluation): Promise<CognitiveEvaluation> {
    const orm = CognitiveEvaluationMapper.toPersistence(evaluation);
    const saved = await this.repository.save(orm as CognitiveEvaluationOrmEntity);
    return CognitiveEvaluationMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveEvaluation | null> {
    const orm = await this.repository.findOne({
      where: { cognitive_evaluations_id: id },
    });
    return orm ? CognitiveEvaluationMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveEvaluation[]> {
    const query = await this.repository.find({
        order: {started_at: 'DESC'}
    })
    return CognitiveEvaluationMapper.toDomainArray(query)
  }

  async findByProject(projectId: string): Promise<CognitiveEvaluation[]> {
    const orms = await this.repository.find({
      where: { project_id: projectId },
      order: { created_at: 'DESC' },
    });
    return CognitiveEvaluationMapper.toDomainArray(orms);
  }

  async findByStatus(status: CognitiveEvaluationStatus): Promise<CognitiveEvaluation[]> {
    const orms = await this.repository.find({
      where: { status },
      order: { created_at: 'DESC' },
    });
    return CognitiveEvaluationMapper.toDomainArray(orms);
  }

  async findBySupervisor(supervisorId: string): Promise<CognitiveEvaluation[]> {
    const orms = await this.repository.find({
      where: { supervisor_id: supervisorId },
      order: { created_at: 'DESC' },
    });
    return CognitiveEvaluationMapper.toDomainArray(orms);
  }

  async findByUser(userId: string): Promise<CognitiveEvaluation[]> {
    // Busca evaluaciones donde el usuario es supervisor o evaluador
    const query = `
      SELECT ce.* FROM usability.cognitive_evaluations ce
      WHERE ce.supervisor_id = $1
      UNION
      SELECT ce.* FROM usability.cognitive_evaluations ce
      INNER JOIN usability.cognitive_evaluators eval ON eval.evaluation_id = ce.cognitive_evaluations_id
      WHERE eval.user_id = $1
    `;
    const orms = await this.repository.query(query, [userId]);
    return orms.map((orm: any) => CognitiveEvaluationMapper.toDomain(orm));
  }


  async updateStatus(id: string, status: CognitiveEvaluationStatus): Promise<CognitiveEvaluation> {
    await this.repository.update(
      { cognitive_evaluations_id: id },
      { status, updated_at: new Date() },
    );
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Evaluation not found after update');
    }
    return updated;
  }

  async countByProject(projectId: string): Promise<number> {
    return this.repository.count({
      where: { project_id: projectId },
    });
  }
}