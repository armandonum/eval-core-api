import { Inject, Injectable } from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens'

@Injectable()
export class DeleteProjectRequirementUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REQUIREMENTS)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(
    requirementId: string,
  ): Promise<void> {
    await this.repository.delete(requirementId)
  }
}