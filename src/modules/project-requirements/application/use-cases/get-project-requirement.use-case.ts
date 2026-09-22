import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens'

@Injectable()
export class GetProjectRequirementUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REQUIREMENTS)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(requirementId: string) {
    const requirement =
      await this.repository.findById(requirementId)

    if (!requirement) {
      throw new NotFoundException(
        'Requirement not found.',
      )
    }

    return requirement
  }
}