import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

@Injectable()
export class GetProjectRequirementUseCase {
  constructor(
    @Inject(ProjectRequirementRepository)
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