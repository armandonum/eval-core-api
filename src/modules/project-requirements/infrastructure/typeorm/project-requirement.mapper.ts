import { ProjectRequirement } from '../../domain/entities/project-requirement.entity'

import { ProjectRequirementTypeormEntity } from './project-requirement.typeorm.entity'

export class ProjectRequirementMapper {
  static toDomain(
    entity: ProjectRequirementTypeormEntity,
  ): ProjectRequirement {
    return new ProjectRequirement(
      entity.requirementId,
      entity.projectId,
      entity.semesterId,
      entity.createdBy,
      entity.code,
      entity.title,
      entity.description,
      entity.acceptanceCriteria,
      entity.createdAt,
      entity.updatedAt,
    )
  }

  static toPersistence(
    entity: ProjectRequirement,
  ): ProjectRequirementTypeormEntity {
    const orm = new ProjectRequirementTypeormEntity()

    orm.requirementId = entity.requirementId
    orm.projectId = entity.projectId
    orm.semesterId = entity.semesterId
    orm.createdBy = entity.createdBy
    orm.code = entity.code
    orm.title = entity.title
    orm.description = entity.description
    orm.acceptanceCriteria = entity.acceptanceCriteria
    orm.createdAt = entity.createdAt
    orm.updatedAt = entity.updatedAt

    return orm
  }
}