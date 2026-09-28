import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AoiDefinitionRepository,
  AOI_DEFINITION_REPOSITORY,
} from '../../domain/interfaces/aoi-definition.repository';
import { AoiDefinition } from '../../domain/entities/aoi-definition.entity';

@Injectable()
export class FindAoiDefinitionUseCase {
  constructor(
    @Inject(AOI_DEFINITION_REPOSITORY)
    private readonly repository: AoiDefinitionRepository,
  ) {}

  async execute(id: string): Promise<AoiDefinition> {
    const aoi = await this.repository.findById(id);
    if (!aoi) {
      throw new NotFoundException(`AOI con ID ${id} no encontrado`);
    }
    return aoi;
  }
}