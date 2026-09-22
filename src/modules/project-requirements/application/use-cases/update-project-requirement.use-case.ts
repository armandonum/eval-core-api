import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

import { UpdateProjectRequirementDto } from '../dtos/update-project-requirement.dto'
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens'

@Injectable()
export class UpdateProjectRequirementUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REQUIREMENTS)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(
    requirementId: string,
    dto: UpdateProjectRequirementDto,
  ) {
    const requirement =
      await this.repository.findById(requirementId)

    if (!requirement) {
      throw new NotFoundException(
        'Requirement not found.',
      )
    }

    requirement.update(dto)

    return this.repository.update(requirement)
  }
}