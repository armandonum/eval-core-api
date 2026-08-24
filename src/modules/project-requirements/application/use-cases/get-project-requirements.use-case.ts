import { Inject, Injectable } from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

@Injectable()
export class GetProjectRequirementsUseCase {
  constructor(
    @Inject(ProjectRequirementRepository)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute() {
    return this.repository.findAll()
  }
}