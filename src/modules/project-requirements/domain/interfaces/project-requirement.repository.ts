import { ProjectRequirement } from '../entities/project-requirement.entity'

export abstract class ProjectRequirementRepository {
  abstract create(
    requirement: ProjectRequirement,
  ): Promise<ProjectRequirement>

  abstract update(
    requirement: ProjectRequirement,
  ): Promise<ProjectRequirement>

  abstract delete(
    requirementId: string,
  ): Promise<void>

  abstract findById(
    requirementId: string,
  ): Promise<ProjectRequirement | null>

  abstract findAll(): Promise<ProjectRequirement[]>

  abstract findByProject(
    projectId: string,
  ): Promise<ProjectRequirement[]>

  abstract existsByCode(
    projectId: string,
    code: string,
  ): Promise<boolean>
}