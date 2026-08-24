// infrastructure/repositories/cognitive-evaluator.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICognitiveEvaluatorRepository } from '../../domain/interfaces/cognitive-evaluator.repository';
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { CognitiveEvaluatorOrmEntity } from '../typeorm/cognitive-evaluator.orm-entity';
import { CognitiveEvaluatorMapper } from '../typeorm/cognitive-evaluator.mapper';
import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';

@Injectable()
export class CognitiveEvaluatorRepository implements ICognitiveEvaluatorRepository {
  constructor(
    @InjectRepository(CognitiveEvaluatorOrmEntity)
    private readonly repository: Repository<CognitiveEvaluatorOrmEntity>,
  ) {}

  async create(evaluator: CognitiveEvaluator): Promise<CognitiveEvaluator> {
    const orm = CognitiveEvaluatorMapper.toPersistence(evaluator);
    const saved = await this.repository.save(orm as CognitiveEvaluatorOrmEntity);
    return CognitiveEvaluatorMapper.toDomain(saved);
  }

  async update(evaluator: CognitiveEvaluator): Promise<CognitiveEvaluator> {
    const orm = CognitiveEvaluatorMapper.toPersistence(evaluator);
    const saved = await this.repository.save(orm as CognitiveEvaluatorOrmEntity);
    return CognitiveEvaluatorMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveEvaluator | null> {
    const orm = await this.repository.findOne({
      where: { id },
    });
    return orm ? CognitiveEvaluatorMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveEvaluator[]> {
    const query = await this.repository.find(
        {
            order: {
                assigned_at: 'ASC'
            }
        }
    );
    return CognitiveEvaluatorMapper.toDomainArray(query);
  }

  async findByEvaluation(evaluationId: string): Promise<CognitiveEvaluator[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { assigned_at: 'ASC' },
    });
    return CognitiveEvaluatorMapper.toDomainArray(orms);
  }

  async findByUser(userId: string): Promise<CognitiveEvaluator[]> {
    const orms = await this.repository.find({
      where: { user_id: userId },
      order: { assigned_at: 'DESC' },
    });
    return CognitiveEvaluatorMapper.toDomainArray(orms);
  }

  async findByEvaluationAndRole(
    evaluationId: string,
    role: CognitiveEvaluatorRole,
  ): Promise<CognitiveEvaluator[]> {
    const orms = await this.repository.find({
      where: { 
        evaluation_id: evaluationId,
        evaluator_role: role,
      },
      order: { assigned_at: 'ASC' },
    });
    return CognitiveEvaluatorMapper.toDomainArray(orms);
  }

  async findByUserAndEvaluation(
    userId: string,
    evaluationId: string,
  ): Promise<CognitiveEvaluator | null> {
    const orm = await this.repository.findOne({
      where: {
        user_id: userId,
        evaluation_id: evaluationId,
      },
    });
    return orm ? CognitiveEvaluatorMapper.toDomain(orm) : null;
  }

  async findByEvaluationAndStatus(
    evaluationId: string,
    completed: boolean,
  ): Promise<CognitiveEvaluator[]> {
    const query = this.repository.createQueryBuilder('ce')
      .where('ce.evaluation_id = :evaluationId', { evaluationId });
    
    if (completed) {
      query.andWhere('ce.completed_at IS NOT NULL');
    } else {
      query.andWhere('ce.completed_at IS NULL');
    }

    const orms = await query.getMany();
    return CognitiveEvaluatorMapper.toDomainArray(orms);
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({
      where: { evaluation_id: evaluationId },
    });
  }

  async countByEvaluationAndRole(
    evaluationId: string,
    role: CognitiveEvaluatorRole,
  ): Promise<number> {
    return this.repository.count({
      where: { 
        evaluation_id: evaluationId,
        evaluator_role: role,
      },
    });
  }

  async removeByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

async findAssignedEvaluationIds(userId: string): Promise<string[]> {
  const results = await this.repository.find({
    where: {
      user_id: userId,
    },
    select: {
      evaluation_id: true,
    },
  });

  return results.map(r => r.evaluation_id);
}
}