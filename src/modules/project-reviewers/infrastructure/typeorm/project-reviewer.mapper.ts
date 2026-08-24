import { ProjectReviewer } from '../../domain/entities/project-reviewer.entity';
import { ProjectReviewerTypeormEntity } from './project-reviewer.typeorm.entity';

export class ProjectReviewerMapper {
  static toDomain(
    orm: ProjectReviewerTypeormEntity,
  ): ProjectReviewer {
    return new ProjectReviewer(
        orm.project_reviewer_id,
        orm.project_id,
        orm.user_id,
        orm.role_id,
        orm.assigned_at,
        orm.assigned_by,
    );
  }

  static toPersistence(
    domain: ProjectReviewer,
  ): ProjectReviewerTypeormEntity {
    const orm = new ProjectReviewerTypeormEntity();

    orm.project_reviewer_id = domain.projectReviewerId;
    orm.project_id = domain.projectId;
    orm.user_id = domain.userId;
    orm.role_id = domain.roleId;
    orm.assigned_at = domain.assignedAt;
    orm.assigned_by = domain.assignedBy;

    return orm;
  }

  static toDomainList(
    list: ProjectReviewerTypeormEntity[],
  ): ProjectReviewer[] {
    return list.map(this.toDomain);
  }
}