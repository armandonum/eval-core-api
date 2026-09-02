import { ProjectRequirement } from '../entities/project-requirement.entity'

export interface  ProjectRequirementRepository {
   create(
    requirement: ProjectRequirement,
  ): Promise<ProjectRequirement>

   update(
    requirement: ProjectRequirement,
  ): Promise<ProjectRequirement>

   delete(
    requirementId: string,
  ): Promise<void>

   findById(
    requirementId: string,
  ): Promise<ProjectRequirement | null>

   findAll(): Promise<ProjectRequirement[]>

   findByProject(
    projectId: string,
  ): Promise<ProjectRequirement[]>

  findBySemester( 
    semesterId: string,
  ): Promise<ProjectRequirement[]>

  existsByCode(code: string, projectId?: string, semesterId?: string): Promise<boolean>

}