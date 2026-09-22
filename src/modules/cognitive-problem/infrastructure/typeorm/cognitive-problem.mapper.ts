// infrastructure/typeorm/cognitive-problem.mapper.ts
import { CognitiveProblem } from '../../domain/entities/cognitive-problem.entity';
import { CognitiveProblemOrmEntity } from './cognitive-problem.orm-entity';
import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';
import { CognitiveProblemStatus } from '../../domain/enums/cognitive-problem-status.enum';

export class CognitiveProblemMapper {
  static toDomain(orm: CognitiveProblemOrmEntity): CognitiveProblem {
    return new CognitiveProblem(
      orm.id,
      orm.evaluation_id,
      orm.title,
      orm.description,
      orm.severity,
      orm.category,
      orm.reported_by,
      orm.affected_tasks || [],
      orm.status,
      orm.resolution_notes,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toPersistence(domain: CognitiveProblem): Partial<CognitiveProblemOrmEntity> {
    return {
      id: domain.id,
      evaluation_id: domain.evaluationId,
      title: domain.title,
      description: domain.description,
      severity: domain.severity,
      category: domain.category,
      reported_by: domain.reportedBy,
      affected_tasks: domain.affectedTasks,
      status: domain.status,
      resolution_notes: domain.resolutionNotes,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDomainArray(orms: CognitiveProblemOrmEntity[]): CognitiveProblem[] {
    return orms.map(orm => this.toDomain(orm));
  }
}