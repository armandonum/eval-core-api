// infrastructure/repositories/finding.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IFindingRepository, FindFindingsOptions, FindingSummary } from '../../domain/interfaces/finding.repository';
import { Finding } from '../../domain/entities/finding.entity';
import { FindingOrmEntity } from '../typeorm/finding.orm-entity';
import { FindingMapper } from '../typeorm/finding.mapper';
import { FindingType } from '../../domain/enums/finding-type.enum';
import { FindingSeverity } from '../../domain/enums/finding-severity.enum';
import { FindingStatus } from '../../domain/enums/finding-status.enum';

@Injectable()
export class FindingRepository implements IFindingRepository {
  constructor(
    @InjectRepository(FindingOrmEntity)
    private readonly repository: Repository<FindingOrmEntity>,
  ) {}

  async create(finding: Finding): Promise<Finding> {
    const orm = FindingMapper.toPersistence(finding);
    const saved = await this.repository.save(orm as FindingOrmEntity);
    return FindingMapper.toDomain(saved);
  }

  async update(finding: Finding): Promise<Finding> {
    const orm = FindingMapper.toPersistence(finding);
    const saved = await this.repository.save(orm as FindingOrmEntity);
    return FindingMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Finding | null> {
    const orm = await this.repository.findOne({
      where: { finding_id: id },
    });
    return orm ? FindingMapper.toDomain(orm) : null;
  }

  async findAll(options?: FindFindingsOptions): Promise<Finding[]> {
    const query = this.repository.createQueryBuilder('f');
    
    if (options?.evaluationId) {
      query.where('f.evaluation_id = :evaluationId', { evaluationId: options.evaluationId });
    }
    if (options?.sessionId) {
      query.andWhere('f.session_id = :sessionId', { sessionId: options.sessionId });
    }
    if (options?.taskId) {
      query.andWhere('f.task_id = :taskId', { taskId: options.taskId });
    }
    if (options?.status) {
      query.andWhere('f.status = :status', { status: options.status });
    }
    if (options?.severity) {
      query.andWhere('f.severity = :severity', { severity: options.severity });
    }
    if (options?.type) {
      query.andWhere('f.type = :type', { type: options.type });
    }
    if (options?.search) {
      query.andWhere(
        '(f.description ILIKE :search OR f.recommendation ILIKE :search)',
        { search: `%${options.search}%` }
      );
    }

    if (options?.limit) {
      query.limit(options.limit);
    }
    if (options?.offset) {
      query.offset(options.offset);
    }
    if (options?.orderBy) {
      query.orderBy(`f.${options.orderBy}`, options.orderDirection || 'ASC');
    } else {
      query.orderBy('f.severity', 'DESC');
    }

    const orms = await query.getMany();
    return FindingMapper.toDomainArray(orms);
  }

  async findByEvaluation(evaluationId: string): Promise<Finding[]> {
    const orms = await this.repository.find({
      where: { evaluation_id: evaluationId },
      order: { severity: 'DESC', created_at: 'DESC' },
    });
    return FindingMapper.toDomainArray(orms);
  }

  async findBySession(sessionId: string): Promise<Finding[]> {
    const orms = await this.repository.find({
      where: { session_id: sessionId },
      order: { severity: 'DESC' },
    });
    return FindingMapper.toDomainArray(orms);
  }

  async findByTask(taskId: string): Promise<Finding[]> {
    const orms = await this.repository.find({
      where: { task_id: taskId },
      order: { severity: 'DESC' },
    });
    return FindingMapper.toDomainArray(orms);
  }

  async findByStatus(status: FindingStatus): Promise<Finding[]> {
    const orms = await this.repository.find({
      where: { status },
      order: { severity: 'DESC' },
    });
    return FindingMapper.toDomainArray(orms);
  }

  async findBySeverity(severity: FindingSeverity): Promise<Finding[]> {
    const orms = await this.repository.find({
      where: { severity },
      order: { created_at: 'DESC' },
    });
    return FindingMapper.toDomainArray(orms);
  }

  async findByType(type: FindingType): Promise<Finding[]> {
    const orms = await this.repository.find({
      where: { type },
      order: { severity: 'DESC' },
    });
    return FindingMapper.toDomainArray(orms);
  }

  async countByEvaluation(evaluationId: string): Promise<number> {
    return this.repository.count({
      where: { evaluation_id: evaluationId },
    });
  }

  async countByStatus(evaluationId: string): Promise<Record<FindingStatus, number>> {
    const result = await this.repository
      .createQueryBuilder('f')
      .select('f.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('f.evaluation_id = :evaluationId', { evaluationId })
      .groupBy('f.status')
      .getRawMany();

    const counts: Record<FindingStatus, number> = {
      [FindingStatus.PENDING]: 0,
      [FindingStatus.IN_PROGRESS]: 0,
      [FindingStatus.RESOLVED]: 0,
      [FindingStatus.NOT_RESOLVED]: 0,
      [FindingStatus.KEPT]: 0,
    };

    for (const row of result) {
      counts[row.status] = parseInt(row.count);
    }

    return counts;
  }

  async countBySeverity(evaluationId: string): Promise<Record<FindingSeverity, number>> {
    const result = await this.repository
      .createQueryBuilder('f')
      .select('f.severity', 'severity')
      .addSelect('COUNT(*)', 'count')
      .where('f.evaluation_id = :evaluationId', { evaluationId })
      .groupBy('f.severity')
      .getRawMany();

    const counts: Record<FindingSeverity, number> = {
      [FindingSeverity.LOW]: 0,
      [FindingSeverity.MEDIUM]: 0,
      [FindingSeverity.HIGH]: 0,
      [FindingSeverity.CRITICAL]: 0,
    };

    for (const row of result) {
      counts[row.severity] = parseInt(row.count);
    }

    return counts;
  }

  async getSummary(evaluationId: string): Promise<FindingSummary> {
    const [total, byStatus, bySeverity, byType] = await Promise.all([
      this.countByEvaluation(evaluationId),
      this.countByStatus(evaluationId),
      this.countBySeverity(evaluationId),
      this.countByType(evaluationId),
    ]);

    const active = (byStatus[FindingStatus.PENDING] || 0) + (byStatus[FindingStatus.IN_PROGRESS] || 0);
    const resolved = byStatus[FindingStatus.RESOLVED] || 0;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return {
      total,
      byStatus,
      bySeverity,
      byType,
      active,
      resolved,
      critical: bySeverity[FindingSeverity.CRITICAL] || 0,
      high: bySeverity[FindingSeverity.HIGH] || 0,
      medium: bySeverity[FindingSeverity.MEDIUM] || 0,
      low: bySeverity[FindingSeverity.LOW] || 0,
      resolutionRate,
    };
  }

  async deleteByEvaluation(evaluationId: string): Promise<void> {
    await this.repository.delete({ evaluation_id: evaluationId });
  }

  private async countByType(evaluationId: string): Promise<Record<FindingType, number>> {
    const result = await this.repository
      .createQueryBuilder('f')
      .select('f.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .where('f.evaluation_id = :evaluationId', { evaluationId })
      .groupBy('f.type')
      .getRawMany();

    const counts: Record<FindingType, number> = {
      [FindingType.PROBLEM]: 0,
      [FindingType.DIFFICULTY]: 0,
      [FindingType.ACCESSIBILITY]: 0,
      [FindingType.FRICTION]: 0,
      [FindingType.POSITIVE]: 0,
      [FindingType.OPPORTUNITY]: 0,
    };

    for (const row of result) {
      counts[row.type] = parseInt(row.count);
    }

    return counts;
  }
}