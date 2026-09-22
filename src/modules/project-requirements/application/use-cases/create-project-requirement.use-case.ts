import { Inject, Injectable, ConflictException } from '@nestjs/common'

import { ProjectRequirement } from '../../domain/entities/project-requirement.entity'
import { ProjectRequirementRepository } from '../../domain/interfaces/project-requirement.repository'

import { CreateProjectRequirementDto } from '../dtos/create-project-requirement.dto'
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens'

@Injectable()
export class CreateProjectRequirementUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.PROJECT_REQUIREMENTS)
    private readonly repository: ProjectRequirementRepository,
  ) {}

  async execute(
    dto: CreateProjectRequirementDto,
  ): Promise<ProjectRequirement> {
    let exists: boolean

    if (dto.projectId) {
      exists = await this.repository.existsByCode(
        dto.code,        
        dto.projectId,   
        undefined,       
      )
    } else if (dto.semesterId) {
      exists = await this.repository.existsByCode(
        dto.code,          
        undefined,        
        dto.semesterId,    
      )
    } else {
      throw new Error('Se requiere projectId o semesterId')
    }

    if (exists) {
      throw new ConflictException(
        `Ya existe un requerimiento con el código "${dto.code}" en este contexto`,
      )
    }

    const requirement = new ProjectRequirement(
      crypto.randomUUID(),
      dto.projectId,
      dto.semesterId,
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