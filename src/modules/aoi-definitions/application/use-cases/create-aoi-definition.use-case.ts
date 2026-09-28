import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  AoiDefinitionRepository,
  AOI_DEFINITION_REPOSITORY,
} from '../../domain/interfaces/aoi-definition.repository';
import { AoiDefinition } from '../../domain/entities/aoi-definition.entity';
import { CreateAoiDefinitionDto } from '../dtos/create-aoi-definition.dto';

@Injectable()
export class CreateAoiDefinitionUseCase {
  constructor(
    @Inject(AOI_DEFINITION_REPOSITORY)
    private readonly repository: AoiDefinitionRepository,
  ) {}

  async execute(dto: CreateAoiDefinitionDto): Promise<AoiDefinition> {
    // Verificar que no exista un AOI con el mismo nombre en el proyecto
    const existing = await this.repository.findByNameAndProject(
      dto.name,
      dto.projectId,
    );

    if (existing) {
      throw new ConflictException(
        `Ya existe un AOI con el nombre "${dto.name}" en este proyecto`,
      );
    }

    const aoi = AoiDefinition.create(
      dto.projectId,
      dto.name,
      dto.x1,
      dto.y1,
      dto.x2,
      dto.y2,
      dto.taskId ?? null,
      dto.description ?? null,
      dto.nodeId ?? null,
      dto.aoiType ?? 'button',
      dto.createdBy ?? null,
    );

    return this.repository.create(aoi);
  }
}