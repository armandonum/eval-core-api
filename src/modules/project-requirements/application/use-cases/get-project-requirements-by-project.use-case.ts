import { Inject, Injectable } from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

@Injectable()
export class GetProjectRequirementsByProjectUseCase {
  constructor(
    @Inject(ProjectRequirementRepository)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(projectId: string) {
    return this.repository.findByProject(projectId)
  }
}