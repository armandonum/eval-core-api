
export class ProjectRequirementResponseDto {
  requirementId: string

  projectId: string

  createdBy: string | null

  code: string

  title: string

  description: string

  acceptanceCriteria: string | null

  createdAt: Date

  updatedAt: Date
}