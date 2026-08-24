import { Inject, Injectable } from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

@Injectable()
export class DeleteProjectRequirementUseCase {
  constructor(
    @Inject(ProjectRequirementRepository)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(
    requirementId: string,
  ): Promise<void> {
    await this.repository.delete(requirementId)
  }
}