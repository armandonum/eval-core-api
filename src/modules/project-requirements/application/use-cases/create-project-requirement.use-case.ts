import { Inject, Injectable, ConflictException } from '@nestjs/common'

import { ProjectRequirement } from '../../domain/entities/project-requirement.entity'
import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

import { CreateProjectRequirementDto } from '../dtos/create-project-requirement.dto'

@Injectable()
export class CreateProjectRequirementUseCase {
  constructor(
    @Inject(ProjectRequirementRepository)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(
    dto: CreateProjectRequirementDto,
  ): Promise<ProjectRequirement> {
    const exists = await this.repository.existsByCode(
      dto.projectId,
      dto.code,
    )

    if (exists) {
      throw new ConflictException(
        'Requirement code already exists.',
      )
    }

    const requirement = new ProjectRequirement(
      crypto.randomUUID(),
      dto.projectId,
      dto.createdBy,
      dto.code,
      dto.title,
      dto.description,
      dto.acceptanceCriteria ?? null,
      new Date(),
      new Date(),
    )

    return this.repository.create(requirement)
  }
}