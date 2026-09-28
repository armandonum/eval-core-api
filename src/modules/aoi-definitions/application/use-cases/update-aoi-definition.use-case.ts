import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AoiDefinitionRepository,
  AOI_DEFINITION_REPOSITORY,
} from '../../domain/interfaces/aoi-definition.repository';
import { AoiDefinition } from '../../domain/entities/aoi-definition.entity';
import { UpdateAoiDefinitionDto } from '../dtos/update-aoi-definition.dto';

@Injectable()
export class UpdateAoiDefinitionUseCase {
  constructor(
    @Inject(AOI_DEFINITION_REPOSITORY)
    private readonly repository: AoiDefinitionRepository,
  ) {}

  async execute(id: string, dto: UpdateAoiDefinitionDto): Promise<AoiDefinition> {
    const aoi = await this.repository.findById(id);
    if (!aoi) {
      throw new NotFoundException(`AOI con ID ${id} no encontrado`);
    }

    aoi.update(
      dto.name,
      dto.description,
      dto.x1,
      dto.y1,
      dto.x2,
      dto.y2,
      dto.nodeId,
      dto.aoiType,
      dto.taskId,
    );

    return this.repository.update(id, aoi);
  }
}