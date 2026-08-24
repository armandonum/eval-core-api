// infrastructure/repositories/cognitive-problem.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ICognitiveProblemRepository } from '../../domain/interfaces/cognitive-problem.repository';
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { CognitiveProblemOrmEntity } from '../typeorm/cognitive-problem.orm-entity';
import { CognitiveProblemMapper } from '../typeorm/cognitive-problem.mapper';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';

@Injectable()
export class CognitiveProblemRepository implements ICognitiveProblemRepository {
  constructor(
    @InjectRepository(CognitiveProblemOrmEntity)
    private readonly repository: Repository<CognitiveProblemOrmEntity>,
  ) {}

  async create(problem: CognitiveProblem): Promise<CognitiveProblem> {
    const orm = CognitiveProblemMapper.toPersistence(problem);
    const saved = await this.repository.save(orm as CognitiveProblemOrmEntity);
    return CognitiveProblemMapper.toDomain(saved);
  }

  async update(problem: CognitiveProblem): Promise<CognitiveProblem> {
    const orm = CognitiveProblemMapper.toPersistence(problem);
    const saved = await this.repository.save(orm as CognitiveProblemOrmEntity);
    return CognitiveProblemMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CognitiveProblem | null> {
    const orm = await this.repository.findOne({
      where: { id },
    });
    return orm ? CognitiveProblemMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<CognitiveProblem[]> {
    const query =await this.repository.find({
        order:{created_at: 'ASC'  }
    })

    return CognitiveProblemMapper.toDomainArray(query);
  }

  async findByEvaluation(evaluationId: string): Promise<CognitiveProblem[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { severity: 'DESC', created_at: 'DESC' },
    });
    return CognitiveProblemMapper.toDomainArray(orms);
  }

  async findBySeverity(severity: CognitiveProblemSeverity): Promise<CognitiveProblem[]> {
    const orms = await this.repository.find({
      where: { severity },
      order: { created_at: 'DESC' },
    });
    return CognitiveProblemMapper.toDomainArray(orms);
  }

  async findByCategory(category: CognitiveProblemCategory): Promise<CognitiveProblem[]> {
    const orms = await this.repository.find({
      where: { category },
      order: { severity: 'DESC' },
    });
    return CognitiveProblemMapper.toDomainArray(orms);
  }

  async findByStatus(status: CognitiveProblemStatus): Promise<CognitiveProblem[]> {
    const orms = await this.repository.find({
      where: { status },
      order: { severity: 'DESC' },
    });
    return CognitiveProblemMapper.toDomainArray(orms);
  }

  async findByEvaluationAndStatus(
    evaluationId: string,
    status: CognitiveProblemStatus,
  ): Promise<CognitiveProblem[]> {
    const orms = await this.repository.find({
      where: {
        evaluation_id: evaluationId,
        status,
      },
      order: { severity: 'DESC' },
    });
    return CognitiveProblemMapper.toDomainArray(orms);
  }

  async findByEvaluationAndSeverity(
    evaluationId: string,
    severity: CognitiveProblemSeverity,
  ): Promise<CognitiveProblem[]> {
    const orms = await this.repository.find({
      where: {
        evaluation_id: evaluationId,
        severity,
      },
      order: { created_at: 'DESC' },
    });
    return CognitiveProblemMapper.toDomainArray(orms);
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({
      where: { evaluation_id: evaluationId },
    });
  }

  async countBySeverity(evaluationId: string): Promise<Record<CognitiveProblemSeverity, number>> {
    const result = await this.repository
      .createQueryBuilder('cp')
      .select('cp.severity', 'severity')
      .addSelect('COUNT(*)', 'count')
      .where('cp.evaluation_id = :evaluationId', { evaluationId })
      .groupBy('cp.severity')
      .getRawMany();

    const counts: Record<CognitiveProblemSeverity, number> = {
      [CognitiveProblemSeverity.CRITICAL]: 0,
      [CognitiveProblemSeverity.HIGH]: 0,
      [CognitiveProblemSeverity.MEDIUM]: 0,
      [CognitiveProblemSeverity.LOW]: 0,
    };

    for (const row of result) {
      counts[row.severity] = parseInt(row.count);
    }

    return counts;
  }

  async countByCategory(evaluationId: string): Promise<Record<CognitiveProblemCategory, number>> {
    const result = await this.repository
      .createQueryBuilder('cp')
      .select('cp.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('cp.evaluation_id = :evaluationId', { evaluationId })
      .andWhere('cp.category IS NOT NULL')
      .groupBy('cp.category')
      .getRawMany();

    const counts: Record<CognitiveProblemCategory, number> = {
      [CognitiveProblemCategory.DESIGN]: 0,
      [CognitiveProblemCategory.FUNCTIONALITY]: 0,
      [CognitiveProblemCategory.NAVIGATION]: 0,
      [CognitiveProblemCategory.CONTENT]: 0,
      [CognitiveProblemCategory.PERFORMANCE]: 0,
      [CognitiveProblemCategory.ACCESSIBILITY]: 0,
      [CognitiveProblemCategory.USABILITY]: 0,
      [CognitiveProblemCategory.OTHER]: 0,
    };

    for (const row of result) {
      if (row.category && row.category in counts) {
        counts[row.category as CognitiveProblemCategory] = parseInt(row.count);
      }
    }

    return counts;
  }

  async countByStatus(evaluationId: string): Promise<Record<CognitiveProblemStatus, number>> {
    const result = await this.repository
      .createQueryBuilder('cp')
      .select('cp.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('cp.evaluation_id = :evaluationId', { evaluationId })
      .groupBy('cp.status')
      .getRawMany();

    const counts: Record<CognitiveProblemStatus, number> = {
      [CognitiveProblemStatus.IDENTIFIED]: 0,
      [CognitiveProblemStatus.ANALYZING]: 0,
      [CognitiveProblemStatus.RESOLVED]: 0,
      [CognitiveProblemStatus.REJECTED]: 0,
    };

    for (const row of result) {
      counts[row.status as CognitiveProblemStatus] = parseInt(row.count);
    }

    return counts;
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  async findDuplicateProblems(
    evaluationId: string,
    title: string,
    description: string,
  ): Promise<CognitiveProblem[]> {
    const orms = await this.repository
      .createQueryBuilder('cp')
      .where('cp.evaluation_id = :evaluationId', { evaluationId })
      .andWhere(
        '(cp.title ILIKE :title OR cp.description ILIKE :description)',
        {
          title: `%${title}%`,
          description: `%${description.substring(0, 50)}%`,
        }
      )
      .getMany();

    return CognitiveProblemMapper.toDomainArray(orms);
  }
}